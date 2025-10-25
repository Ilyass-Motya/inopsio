import { test, expect } from '@playwright/test';

test.describe('Marketing Website', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the homepage', async ({ page }) => {
    await expect(page).toHaveTitle(/Inopsio/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should have working navigation', async ({ page }) => {
    // Test main navigation
    await expect(page.locator('nav')).toBeVisible();
    
    // Test navigation links
    const navLinks = page.locator('nav a');
    await expect(navLinks).toHaveCount.greaterThan(0);
    
    // Test navigation functionality
    await page.click('nav a[href="/products"]');
    await expect(page).toHaveURL(/.*products/);
  });

  test('should have working blog section', async ({ page }) => {
    // Navigate to blog
    await page.click('a[href="/blog"]');
    await expect(page).toHaveURL(/.*blog/);
    
    // Check blog posts are visible
    await expect(page.locator('[data-testid="blog-posts"]')).toBeVisible();
    
    // Test blog post navigation
    const firstPost = page.locator('[data-testid="blog-post"]').first();
    await expect(firstPost).toBeVisible();
    
    await firstPost.click();
    await expect(page).toHaveURL(/.*blog\/.*/);
  });

  test('should have working contact form', async ({ page }) => {
    // Navigate to contact page
    await page.click('a[href="/contact"]');
    await expect(page).toHaveURL(/.*contact/);
    
    // Test contact form
    await expect(page.locator('form')).toBeVisible();
    
    // Fill out contact form
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('textarea[name="message"]', 'Test message');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Check for success message
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
  });

  test('should be SEO optimized', async ({ page }) => {
    // Check meta tags
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content');
    await expect(page.locator('meta[name="keywords"]')).toHaveAttribute('content');
    
    // Check Open Graph tags
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content');
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content');
    
    // Check structured data
    await expect(page.locator('script[type="application/ld+json"]')).toBeVisible();
  });

  test('should be accessible', async ({ page }) => {
    // Check for proper heading structure
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    await expect(headings).toHaveCount.greaterThan(0);
    
    // Check for alt text on images
    const images = page.locator('img');
    const imageCount = await images.count();
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      await expect(img).toHaveAttribute('alt');
    }
    
    // Check for proper form labels
    const inputs = page.locator('input, textarea, select');
    const inputCount = await inputs.count();
    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute('id');
      if (id) {
        await expect(page.locator(`label[for="${id}"]`)).toBeVisible();
      }
    }
  });

  test('should be responsive', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('nav')).toBeVisible();
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('nav')).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('nav')).toBeVisible();
  });
});

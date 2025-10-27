# Container Standards for Marketing Website

## Overview

This document defines the standardized container pattern used across all main sections of the Inopsio marketing website to ensure visual consistency, proper responsive behavior, and optimal user experience across all screen sizes.

---

## 🧱 TL;DR - Container Pattern by Section Type

| Section | Container | Background | Notes |
|---------|-----------|------------|-------|
| **Header** | `max-w-7xl mx-auto px-6 sm:px-8 lg:px-12` | Can be full-width | Keeps nav aligned with content |
| **Hero** | Full-width wrapper + `max-w-7xl` inner | Usually full-width | For maximum visual impact |
| **Content Sections** | `max-w-7xl mx-auto px-6 sm:px-8 lg:px-12` | Usually white/neutral | Standardize all content here |
| **CTA** | Same container if inline; full-bleed wrapper if standalone | Often colored | Maintain content alignment |
| **Footer** | `max-w-7xl mx-auto px-6 sm:px-8 lg:px-12` | Usually full-width | Keep structured and aligned |

### Core Values:

| Setting | Value | Purpose |
|---------|-------|---------|
| **Max width** | `max-w-7xl` (1280px) | Prevents content from stretching too wide on large screens |
| **Centering** | `mx-auto` | Centers content horizontally |
| **Padding** | `px-6 sm:px-8 lg:px-12` | Responsive horizontal padding (24px → 32px → 48px) |
| **Vertical Spacing** | `py-16 sm:py-20 lg:py-24` | Consistent section spacing |
| **Wide Sections** | Use full-width wrapper + centered inner container | For sections with full-width backgrounds or effects |

---

## Standard Container Pattern

### Basic Pattern

For most sections without special backgrounds:

```tsx
<section className="py-16 sm:py-20 lg:py-24">
  <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
    {/* Section content here */}
  </div>
</section>
```

### Pattern with Background/Effects

For sections with full-width backgrounds, shadows, or special effects:

```tsx
<section className="py-16 sm:py-20 lg:py-24">
  <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
    <div className="bg-white rounded-xl shadow-lg border border-slate-200">
      <div className="p-6 sm:p-8 lg:px-12">
        {/* Section content here */}
      </div>
    </div>
  </div>
</section>
```

---

## Responsive Breakpoints

### Padding Scale

| Breakpoint | Class | Pixels | Usage |
|-----------|-------|--------|-------|
| Mobile (default) | `px-6` | 24px | Comfortable mobile spacing |
| Tablet | `sm:px-8` | 32px | Optimized for tablets |
| Desktop | `lg:px-12` | 48px | Professional desktop spacing |

### Vertical Spacing

| Breakpoint | Class | Pixels | Usage |
|-----------|-------|--------|-------|
| Mobile (default) | `py-16` | 64px | Comfortable section separation |
| Tablet | `sm:py-20` | 80px | Enhanced spacing |
| Desktop | `lg:py-24` | 96px | Premium desktop spacing |

---

## Implementation Examples

### Example 1: Header (Floating with Glass Effect)

```tsx
export default function Header() {
  return (
    <header className="fixed z-50 top-4 sm:top-5 lg:top-6 left-0 right-0">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <nav
          className="relative rounded-2xl"
          style={{
            backdropFilter: 'blur(30px) saturate(200%)',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <div className="flex justify-between items-center h-14 lg:h-[60px] px-4 lg:px-6">
            {/* Nav content */}
          </div>
        </nav>
      </div>
    </header>
  )
}
```

### Example 2: Hero (Full-Width with Centered Content)

```tsx
export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Full-width background */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Your Hero Title</h1>
          {/* Hero content */}
        </div>
      </div>
    </section>
  )
}
```

### Example 3: Footer (Structured with Glass Effect)

```tsx
export default function Footer() {
  return (
    <footer className="py-8 sm:py-10 lg:py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div
          className="rounded-2xl"
          style={{
            backdropFilter: 'blur(30px) saturate(200%)',
            background: 'rgba(255, 255, 255, 0.1)'
          }}
        >
          <div className="px-6 sm:px-8 lg:px-12 py-8">
            {/* Footer content */}
          </div>
        </div>
      </div>
    </footer>
  )
}
```

### Example 4: Stats Section (Basic Pattern)

```tsx
export default function Stats() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            Inopsio by the Numbers
          </h2>
        </div>
        {/* Grid content */}
      </div>
    </section>
  )
}
```

### Example 5: CTA Section (Nested Pattern)

```tsx
export default function CTA() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div
          className="relative rounded-xl shadow-lg overflow-hidden py-16 sm:py-20"
          style={{
            backgroundImage: 'url(/images/cta-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="relative z-10 px-6 sm:px-8">
            {/* CTA content */}
          </div>
        </div>
      </div>
    </section>
  )
}
```

### Example 6: Card Section (Glass Effect)

```tsx
export default function PlatformOverview() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div
          className="bg-white rounded-xl shadow-lg border border-slate-200"
          style={{
            backdropFilter: 'blur(20px) saturate(150%)',
            background: 'rgba(255, 255, 255, 0.05)'
          }}
        >
          <div className="p-6 sm:p-8 lg:p-12">
            {/* Platform features grid */}
          </div>
        </div>
      </div>
    </section>
  )
}
```

---

## Section-by-Section Implementation

### ✅ Standardized Components

All components now follow the consistent container pattern:

#### Layout Components:
1. **Header.tsx** - Fixed positioned with `max-w-7xl` inner nav, glass effect
2. **Footer.tsx** - Full-width wrapper with `max-w-7xl` centered content, glass card
3. **Hero.tsx** - Full-screen with `max-w-7xl` centered content

#### Content Sections:
4. **Features.tsx** - Nested pattern with glass effect
5. **Stats.tsx** - Basic pattern with gradient background
6. **PlatformOverview.tsx** - Nested pattern with card styling
7. **IndustrySolutions.tsx** - Nested pattern with glass card
8. **ResourcesTeaser.tsx** - Basic pattern with grid
9. **CTA.tsx** - Nested pattern with background image

---

## Design Principles

### Why max-w-7xl (1280px)?

- **Readability**: Prevents text lines from becoming too long (optimal 60-80 characters per line)
- **Visual Balance**: Content doesn't feel lost on ultra-wide screens (2K, 4K, 8K displays)
- **Consistency**: Matches industry standards (Tailwind, Vercel, Stripe, etc.)
- **Flexibility**: Large enough for complex layouts, small enough for focus

### Why Responsive Padding?

- **Mobile First**: 24px provides comfortable touch targets and breathing room
- **Tablet Optimization**: 32px adapts to medium screens
- **Desktop Polish**: 48px creates premium feel on large displays
- **Progressive Enhancement**: Scales naturally with viewport size

### Container Structure Hierarchy

```
section (full-width, sets vertical rhythm)
  └─ .max-w-7xl.mx-auto.px-* (constrains width, centers, adds horizontal padding)
      └─ [optional] styled wrapper (backgrounds, borders, shadows)
          └─ [optional] inner padding (for card-like sections)
              └─ content (text, grids, etc.)
```

---

## Migration Guide

### Before (Old Pattern)

```tsx
❌ Don't use this:
<section
  className="py-16"
  style={{
    marginLeft: '50px',
    marginRight: '50px'
  }}
>
  <div className="w-full">
    {/* content */}
  </div>
</section>
```

### After (New Pattern)

```tsx
✅ Use this:
<section className="py-16 sm:py-20 lg:py-24">
  <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
    {/* content */}
  </div>
</section>
```

---

## Testing Checklist

When implementing or reviewing sections, verify:

- [ ] Section uses `max-w-7xl mx-auto`
- [ ] Responsive padding `px-6 sm:px-8 lg:px-12` is applied
- [ ] Vertical spacing follows `py-16 sm:py-20 lg:py-24` pattern
- [ ] Content is centered on all screen sizes
- [ ] No fixed margins (like `marginLeft: '50px'`)
- [ ] Sections align consistently across the page
- [ ] Content doesn't stretch beyond 1280px on wide screens
- [ ] Mobile spacing is comfortable (min 24px sides)

---

## Maintenance

### When to Update

- Adding new sections to the marketing website
- Refactoring existing sections
- Creating new page templates
- Building landing pages

### Code Review Standards

All new sections must:
1. Follow the TL;DR pattern
2. Use responsive padding values
3. Include max-width constraint
4. Maintain visual consistency with existing sections

---

## Related Documentation

- [Marketing Website Summary](./marketing-website-summary.md)
- [Dark Mode Implementation](./dark-mode-implementation.md)
- [UI/UX Guidelines](/docs/prd/ui-ux-guidelines.md)
- [Aligned Tech Stack](/docs/architecture/aligned-tech-stack.md)

---

**Last Updated**: January 2025
**Status**: ✅ Active - All sections standardized
**Owner**: Frontend Team

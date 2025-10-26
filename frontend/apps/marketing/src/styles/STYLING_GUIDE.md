# Marketing Website Styling Guide

## 🎨 **Overview**
This guide documents the comprehensive styling system implemented for the Inopsio marketing website, including responsive design patterns, component styles, utility classes, and icon standards.

---

## 🎯 **Design System**

### **Color Palette**
- **Primary Blue**: `#0048e7` (primary-600)
- **Secondary Blue**: `#1D4ED8` (blue-700)
- **Secondary Indigo**: `#4f46e5` (indigo-600)
- **Accent Purple**: `#7c3aed` (purple-600)
- **Neutral Slate**: `#64748b` (slate-600)
- **Background**: `#f8fafc` (slate-50)

### **Typography**
- **Font Family**: Sansation (Google Fonts)
- **Headings**: Bold, tracking-tight
- **Body Text**: Leading-relaxed
- **Responsive**: Mobile-first approach

### **Icon System**
- **Standard Library**: Heroicons React (@heroicons/react)
- **Version**: v2.0.0
- **Usage**: Import from `@heroicons/react/24/outline` or `@heroicons/react/24/solid`
- **No Custom Icons**: All icons must use Heroicons library
- **Consistency**: Ensures uniform icon style and behavior across the website

---

## 🧩 **Component Classes**

### **Layout Classes**
```css
.container-custom     /* Max-width container with responsive padding */
.section-padding      /* Horizontal padding: px-4 sm:px-6 lg:px-8 */
.section-padding-y    /* Vertical padding: py-12 sm:py-16 lg:py-20 */
.section-spacing      /* Full section spacing: py-12 sm:py-16 lg:py-20 xl:py-24 */
```

### **Typography Classes**
```css
.heading-xl          /* text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight */
.heading-lg          /* text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight */
.heading-md          /* text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight */
.heading-sm          /* text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight */
.text-lead           /* text-lg sm:text-xl lg:text-2xl text-slate-600 leading-relaxed */
.text-body           /* text-base sm:text-lg text-slate-600 leading-relaxed */
```

### **Button Classes**
```css
.btn-primary         /* Blue primary button with hover effects */
.btn-secondary       /* White button with blue border */
.btn-outline         /* Transparent button with border */
```

### **Card Classes**
```css
.card               /* Basic card with subtle shadow */
.card-elevated      /* Card with enhanced shadow */
.feature-card       /* Interactive feature card with hover effects */
```

### **Background Classes**
```css
.bg-pattern         /* Light background with gradient overlay */
.bg-pattern-dark    /* Dark background with gradient overlay */
.hero-gradient      /* Hero section gradient background */
```

---

## 📱 **Responsive Design**

### **Breakpoints**
- **Mobile**: `0px - 640px`
- **Tablet**: `640px - 1024px`
- **Desktop**: `1024px - 1280px`
- **Large Desktop**: `1280px+`

### **Mobile-First Approach**
All styles are designed mobile-first with progressive enhancement:
```css
/* Mobile (default) */
.class { /* mobile styles */ }

/* Tablet and up */
@media (min-width: 640px) {
  .class { /* tablet styles */ }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .class { /* desktop styles */ }
}
```

---

## 🎭 **Animation Classes**

### **Fade Animations**
```css
.fade-in            /* Opacity 0 to 100 with translate-y */
.fade-in.visible    /* Active state */
```

### **Slide Animations**
```css
.slide-up           /* Slide up from bottom */
.slide-up.visible   /* Active state */
```

### **Scale Animations**
```css
.scale-in           /* Scale from 95% to 100% */
.scale-in.visible   /* Active state */
```

---

## 🎨 **Background Pattern System**

### **Interactive Grid Pattern**
The website uses a shadcn interactive grid pattern as the primary background:

```tsx
<BackgroundPattern 
  variant="light" 
  opacity={0.05} 
  className="absolute inset-0"
/>
```

### **Pattern Variants**
- **Light**: Subtle grid with light colors
- **Dark**: Dark grid for dark sections
- **Opacity**: Configurable transparency (0.05 - 0.2)

---

## 🧩 **Component-Specific Styles**

### **Hero Section**
```css
.hero-gradient      /* Gradient background */
.hero-text-gradient /* Gradient text effect */
```

### **Feature Cards**
```css
.feature-card       /* Interactive card with hover effects */
.feature-card-icon  /* Icon container with hover animation */
```

### **Icon Classes**
```css
.icon-sm           /* Small icons: w-4 h-4 */
.icon-md           /* Medium icons: w-5 h-5 */
.icon-lg           /* Large icons: w-6 h-6 */
.icon-xl           /* Extra large icons: w-8 h-8 */
.icon-primary      /* Primary color icons */
.icon-secondary    /* Secondary color icons */
.icon-muted        /* Muted color icons */
```

### **Navigation**
```css
.nav-link           /* Navigation link styling */
.nav-link-active    /* Active navigation state */
.mobile-menu        /* Mobile menu overlay */
.mobile-menu-item   /* Mobile menu items */
```

### **Forms**
```css
.form-input         /* Form input styling */
.form-label         /* Form label styling */
```

---

## 📊 **Utility Classes**

### **Text Utilities**
```css
.text-balance       /* Text wrap balance */
.scroll-smooth      /* Smooth scrolling */
```

### **Spacing Utilities**
```css
.section-spacing    /* Responsive section spacing */
.container-spacing  /* Responsive container spacing */
```

---

## 🎯 **Implementation Examples**

### **Section Layout**
```tsx
<section className="section-spacing bg-white">
  <div className="container-custom section-padding">
    <h2 className="heading-lg mb-6 text-balance">
      Section Title
    </h2>
    <p className="text-lead max-w-3xl mx-auto text-balance">
      Section description
    </p>
  </div>
</section>
```

### **Feature Card**
```tsx
import { UserGroupIcon } from '@heroicons/react/24/outline'

<div className="feature-card">
  <div className="feature-card-icon">
    <UserGroupIcon className="icon-lg icon-primary" />
  </div>
  <h3 className="heading-sm mb-3">Feature Title</h3>
  <p className="text-body">Feature description</p>
</div>
```

### **Button Usage**
```tsx
<button className="btn-primary">Primary Action</button>
<button className="btn-secondary">Secondary Action</button>
<button className="btn-outline">Tertiary Action</button>
```

---

## 🎯 **Icon Usage Guidelines**

### **Heroicons Library Standards**
- **Import Pattern**: `import { IconName } from '@heroicons/react/24/outline'`
- **Solid Icons**: Use `@heroicons/react/24/solid` for filled icons when needed
- **Size Classes**: Always use predefined size classes (icon-sm, icon-md, icon-lg, icon-xl)
- **Color Classes**: Use semantic color classes (icon-primary, icon-secondary, icon-muted)

### **Common Icon Patterns**
```tsx
// Navigation icons
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

// Feature icons
import { 
  UserGroupIcon,      // CRM/Users
  BuildingOfficeIcon, // ERP/Office
  EnvelopeIcon,       // Email
  BoltIcon,          // Automation
  ShieldCheckIcon,    // Security
  ChartBarIcon       // Analytics
} from '@heroicons/react/24/outline'

// Utility icons
import { 
  MagnifyingGlassIcon, // Search
  SunIcon,            // Light mode
  MoonIcon,           // Dark mode
  GlobeAltIcon        // Language
} from '@heroicons/react/24/outline'
```

### **Icon Implementation Rules**
1. **No Custom SVGs**: All icons must come from Heroicons library
2. **Consistent Sizing**: Use predefined size classes
3. **Semantic Colors**: Use color classes for consistent theming
4. **Accessibility**: Icons should have proper ARIA labels when used as buttons
5. **Performance**: Import only needed icons to minimize bundle size

---

## 🔧 **Customization**

### **Adding New Component Styles**
1. Add new classes to `globals.css` in the `@layer components` section
2. Follow the existing naming convention
3. Include responsive variants
4. Add hover and focus states

### **Color Customization**
Update the color palette in `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      primary: '#2563eb',
      secondary: '#4f46e5',
      // Add custom colors
    }
  }
}
```

---

## 📱 **Mobile Optimization**

### **Touch Targets**
- Minimum 44px touch targets
- Adequate spacing between interactive elements
- Thumb-friendly navigation

### **Performance**
- Optimized images with Next.js Image component
- Lazy loading for below-the-fold content
- Minimal CSS bundle size

---

## 🎨 **Accessibility**

### **WCAG 2.1 AA Compliance**
- Sufficient color contrast ratios
- Keyboard navigation support
- Screen reader friendly markup
- Focus indicators

### **Semantic HTML**
- Proper heading hierarchy
- Descriptive alt text
- ARIA labels where needed

---

## 🚀 **Performance Considerations**

### **CSS Optimization**
- Utility-first approach with Tailwind
- Minimal custom CSS
- Efficient class combinations

### **Animation Performance**
- GPU-accelerated transforms
- Reduced motion support
- Optimized transition durations

---

**Last Updated**: January 2025  
**Version**: 1.0  
**Maintainer**: Development Team

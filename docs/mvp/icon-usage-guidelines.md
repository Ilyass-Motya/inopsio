# Icon Usage Guidelines - Marketing Website

## 🎯 **Overview**

This document establishes the standard icon usage guidelines for the Inopsio marketing website. All icons must use the Heroicons React library to ensure consistency, maintainability, and optimal performance.

---

## 📚 **Icon Library Standards**

### **Primary Library**
- **Library**: Heroicons React
- **Package**: `@heroicons/react`
- **Version**: v2.0.0
- **Documentation**: https://heroicons.com/

### **Icon Variants**
- **Outline Icons**: `@heroicons/react/24/outline` (default)
- **Solid Icons**: `@heroicons/react/24/solid` (for emphasis)
- **Mini Icons**: `@heroicons/react/20/solid` (for smaller contexts)

---

## 🚫 **Prohibited Practices**

### **NO Custom SVG Icons**
- ❌ Inline SVG elements
- ❌ Custom icon components
- ❌ Icon fonts (FontAwesome, etc.)
- ❌ Image-based icons
- ❌ Other icon libraries (Lucide, React Icons, etc.)

### **Why No Custom Icons?**
1. **Consistency**: Ensures uniform visual style
2. **Performance**: Optimized bundle size
3. **Maintenance**: Single source of truth
4. **Accessibility**: Built-in accessibility features
5. **Updates**: Automatic library updates

---

## ✅ **Implementation Standards**

### **Import Pattern**
```tsx
// ✅ Correct - Outline icons (default)
import { UserGroupIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline'

// ✅ Correct - Solid icons (for emphasis)
import { CheckCircleIcon } from '@heroicons/react/24/solid'

// ✅ Correct - Mini icons (for compact spaces)
import { StarIcon } from '@heroicons/react/20/solid'

// ❌ Incorrect - Custom SVG
<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="..." />
</svg>
```

### **Size Classes**
```tsx
// Use predefined Tailwind classes
<UserGroupIcon className="w-4 h-4" />  // Small (16px)
<UserGroupIcon className="w-5 h-5" />  // Medium (20px)
<UserGroupIcon className="w-6 h-6" />  // Large (24px)
<UserGroupIcon className="w-8 h-8" />  // Extra Large (32px)
```

### **Color Classes**
```tsx
// Use semantic color classes
<UserGroupIcon className="w-6 h-6 text-primary-600" />     // Primary
<UserGroupIcon className="w-6 h-6 text-slate-600" />       // Secondary
<UserGroupIcon className="w-6 h-6 text-gray-400" />         // Muted
<UserGroupIcon className="w-6 h-6 text-green-500" />       // Success
<UserGroupIcon className="w-6 h-6 text-red-500" />         // Error
```

---

## 🎨 **Common Icon Mappings**

### **Navigation Icons**
```tsx
import { 
  Bars3Icon,           // Mobile menu
  XMarkIcon,           // Close menu
  ChevronDownIcon,     // Dropdown arrows
  ChevronRightIcon     // Right arrows
} from '@heroicons/react/24/outline'
```

### **Feature Icons**
```tsx
import { 
  UserGroupIcon,       // CRM/Users/Teams
  BuildingOfficeIcon,  // ERP/Office/Business
  EnvelopeIcon,        // Email/Messages
  BoltIcon,           // Automation/Power
  ShieldCheckIcon,     // Security/Protection
  ChartBarIcon,       // Analytics/Reports
  CogIcon,            // Settings/Configuration
  HeartIcon           // AI/Love/Favorites
} from '@heroicons/react/24/outline'
```

### **Utility Icons**
```tsx
import { 
  MagnifyingGlassIcon, // Search
  SunIcon,            // Light mode
  MoonIcon,           // Dark mode
  GlobeAltIcon,       // Language/International
  UserIcon,           // Profile/Account
  PhoneIcon,          // Contact/Phone
  MailIcon,           // Email/Contact
  MapPinIcon          // Location/Address
} from '@heroicons/react/24/outline'
```

### **Action Icons**
```tsx
import { 
  PlayIcon,           // Play/Start
  PauseIcon,          // Pause/Stop
  ArrowRightIcon,     // Next/Continue
  ArrowLeftIcon,      // Previous/Back
  CheckIcon,          // Success/Complete
  XMarkIcon,          // Cancel/Close
  PlusIcon,           // Add/Create
  MinusIcon           // Remove/Delete
} from '@heroicons/react/24/outline'
```

### **Status Icons**
```tsx
import { 
  CheckCircleIcon,    // Success (solid)
  ExclamationTriangleIcon, // Warning
  XCircleIcon,        // Error (solid)
  InformationCircleIcon,  // Info
  ClockIcon,          // Time/Pending
  StarIcon            // Favorite/Featured
} from '@heroicons/react/24/outline'
```

---

## 🎯 **Usage Examples**

### **Feature Card**
```tsx
import { UserGroupIcon } from '@heroicons/react/24/outline'

export function FeatureCard() {
  return (
    <div className="feature-card">
      <div className="feature-card-icon">
        <UserGroupIcon className="w-8 h-8 text-primary-600" />
      </div>
      <h3 className="heading-sm mb-3">CRM Platform</h3>
      <p className="text-body">Manage customer relationships...</p>
    </div>
  )
}
```

### **Navigation Button**
```tsx
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export function MobileMenuButton({ isOpen, onClick }) {
  return (
    <button onClick={onClick} className="p-2 rounded-lg">
      {isOpen ? (
        <XMarkIcon className="w-6 h-6 text-gray-700" />
      ) : (
        <Bars3Icon className="w-6 h-6 text-gray-700" />
      )}
    </button>
  )
}
```

### **Theme Toggle**
```tsx
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'

export function ThemeToggle({ isDark, onClick }) {
  return (
    <button onClick={onClick} className="p-2 rounded-lg">
      {isDark ? (
        <SunIcon className="w-5 h-5 text-yellow-500" />
      ) : (
        <MoonIcon className="w-5 h-5 text-gray-600" />
      )}
    </button>
  )
}
```

---

## ♿ **Accessibility Guidelines**

### **ARIA Labels**
```tsx
// For interactive icons
<button aria-label="Open mobile menu">
  <Bars3Icon className="w-6 h-6" />
</button>

// For decorative icons (no aria-label needed)
<div className="feature-card-icon">
  <UserGroupIcon className="w-8 h-8 text-primary-600" />
</div>
```

### **Focus States**
```tsx
// Ensure icons in buttons have proper focus styles
<button className="focus:outline-none focus:ring-2 focus:ring-primary-500">
  <MagnifyingGlassIcon className="w-5 h-5" />
</button>
```

---

## 📱 **Responsive Considerations**

### **Icon Sizing**
```tsx
// Responsive icon sizes
<UserGroupIcon className="w-6 h-6 sm:w-7 h-7 lg:w-8 h-8" />

// Or use predefined responsive classes
<UserGroupIcon className="icon-lg" /> // Defined in globals.css
```

### **Touch Targets**
```tsx
// Ensure adequate touch targets for mobile
<button className="p-3 min-w-[44px] min-h-[44px]">
  <MagnifyingGlassIcon className="w-5 h-5" />
</button>
```

---

## 🔧 **Performance Optimization**

### **Tree Shaking**
```tsx
// ✅ Good - Import only needed icons
import { UserGroupIcon } from '@heroicons/react/24/outline'

// ❌ Avoid - Importing entire library
import * as Heroicons from '@heroicons/react/24/outline'
```

### **Bundle Analysis**
- Monitor bundle size impact
- Use only necessary icons
- Consider lazy loading for below-the-fold icons

---

## 🎨 **Design System Integration**

### **Icon Container Classes**
```css
/* Defined in globals.css */
.icon-sm { @apply w-4 h-4; }
.icon-md { @apply w-5 h-5; }
.icon-lg { @apply w-6 h-6; }
.icon-xl { @apply w-8 h-8; }

.icon-primary { @apply text-primary-600; }
.icon-secondary { @apply text-slate-600; }
.icon-muted { @apply text-gray-400; }
```

### **Usage with Classes**
```tsx
<UserGroupIcon className="icon-lg icon-primary" />
<BuildingOfficeIcon className="icon-md icon-secondary" />
```

---

## 📋 **Code Review Checklist**

### **Before Submitting**
- [ ] All icons use Heroicons React library
- [ ] No custom SVG elements present
- [ ] Proper import statements used
- [ ] Appropriate size classes applied
- [ ] Semantic color classes used
- [ ] ARIA labels added for interactive icons
- [ ] Responsive sizing considered
- [ ] Touch targets adequate for mobile

### **Common Issues to Avoid**
- [ ] Mixing icon libraries
- [ ] Using inline SVG instead of Heroicons
- [ ] Hardcoded colors instead of semantic classes
- [ ] Missing accessibility attributes
- [ ] Inconsistent sizing across components

---

## 🔄 **Migration Guide**

### **Converting Custom Icons to Heroicons**

1. **Identify Custom SVG**: Find inline SVG elements
2. **Find Equivalent**: Locate matching Heroicon
3. **Update Import**: Add Heroicon import
4. **Replace Element**: Swap SVG with Heroicon component
5. **Update Classes**: Apply size and color classes
6. **Test**: Verify visual consistency

### **Example Migration**
```tsx
// Before (Custom SVG)
<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
</svg>

// After (Heroicons)
import { UserGroupIcon } from '@heroicons/react/24/outline'
<UserGroupIcon className="w-8 h-8 text-primary-600" />
```

---

## 📞 **Support & Resources**

### **Documentation**
- [Heroicons Official Site](https://heroicons.com/)
- [Heroicons React Package](https://www.npmjs.com/package/@heroicons/react)
- [Tailwind CSS Icons](https://tailwindcss.com/docs/width)

### **Team Contacts**
- **Design System**: Design Team
- **Technical Questions**: Frontend Team
- **Accessibility**: QA Team

---

**Last Updated**: January 2025  
**Version**: 1.0  
**Maintainer**: Frontend Development Team

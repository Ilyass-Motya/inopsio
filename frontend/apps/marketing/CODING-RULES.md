# Coding Rules - Quick Reference

## 🚫 **What's DISABLED** (Won't Happen Automatically)

- ❌ Format on save
- ❌ Format on paste
- ❌ Format while typing
- ❌ ESLint auto-fix
- ❌ Auto-imports
- ❌ Organize imports
- ❌ Accept suggestions on Enter

## ✅ **What YOU Control**

- ✅ Write code however you want
- ✅ Format manually when you want (Ctrl+Shift+F)
- ✅ Fix ESLint warnings when you want
- ✅ Import what you want, when you want

## 🎯 **Code Style**

### **No Semicolons**
```typescript
const name = 'Inopsio'  // ✅
const name = 'Inopsio'; // ❌
```

### **Single Quotes (JavaScript)**
```typescript
const text = 'Hello'    // ✅
const text = "Hello"    // Works but prefer single
```

### **2 Space Indentation**
```typescript
function example() {
  return (
    <div>  // 2 spaces
      Content
    </div>
  )
}
```

### **No Transform Class**
```tsx
// ✅ Simple hover
<button className="hover:scale-105">

// ❌ Don't add transform separately
<button className="transform hover:scale-105">
```

## 📝 **Manual Commands**

| What | How |
|------|-----|
| **Format file** | Ctrl+Shift+F |
| **Save without format** | Ctrl+S |
| **Run ESLint** | `npm run lint` |
| **Type check** | `npm run type-check` |
| **Reload IDE** | Ctrl+Shift+P → "Reload Window" |

## 🎨 **Tailwind Standards**

- Multiple lines OK
- Single line OK
- Max 100 characters per line (suggestion, not enforced)
- Always use `dark:` prefix for dark mode variants

## 📋 **File Organization**

```
src/
├── app/              # Next.js 15 app router
├── components/
│   ├── layout/       # Header, Footer
│   ├── sections/     # Hero, Features, etc.
│   └── providers/    # Context providers
├── lib/              # Utilities
└── styles/           # Global CSS
```

## ⚡ **Quick Fixes**

**IDE still formatting?**
→ Reload window (Ctrl+Shift+P → Reload)

**Suggestions annoying?**
→ Already disabled, use Tab to accept

**Imports auto-organizing?**
→ Check settings.json, should be "never"

## 🎯 **Remember**

> **YOU write the code. The IDE just highlights issues. YOU decide when to fix them.**

---

**See full documentation**: `/docs/mvp/IDE-RULES-GUIDE.md`

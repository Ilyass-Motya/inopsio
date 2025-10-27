# IDE & Linter Rules Guide

## 🎯 **Purpose**
This document explains all the IDE and linter rules configured for the Inopsio marketing website to ensure **consistent code** and **prevent unwanted auto-formatting**.

---

## 📁 **Configuration Files Created**

### **1. `.eslintrc.json`** - ESLint Rules
**Location**: `/frontend/apps/marketing/.eslintrc.json`

**What it does**:
- Catches TypeScript errors
- Enforces React best practices
- **NO AUTO-FORMATTING** - Only warns, doesn't fix

**Key Settings**:
```json
{
  "semi": ["warn", "never"],           // Warns about semicolons, doesn't auto-add
  "prettier/prettier": "off",          // Prettier is DISABLED
  "quotes": "off",                     // No quote enforcement
  "indent": "off",                     // No indent enforcement
  "object-curly-spacing": "off"        // No spacing enforcement
}
```

---

### **2. `.prettierrc`** - Prettier Config (Manual Only)
**Location**: `/frontend/apps/marketing/.prettierrc`

**What it does**:
- Defines formatting rules
- **ONLY RUNS WHEN YOU MANUALLY FORMAT** (Ctrl+Shift+F)
- **NEVER runs on save**

**Settings**:
```json
{
  "semi": false,                // No semicolons
  "singleQuote": true,          // Single quotes for JS
  "tabWidth": 2,                // 2 spaces
  "printWidth": 100,            // Max line length 100
  "trailingComma": "es5"        // Trailing commas where valid
}
```

---

### **3. `.vscode/settings.json`** - VSCode Behavior
**Location**: `/frontend/apps/marketing/.vscode/settings.json`

**What it does**:
- Controls VSCode editor behavior
- **DISABLES all auto-formatting**
- Prevents unwanted auto-imports

**Key Settings**:
```json
{
  "editor.formatOnSave": false,        // ❌ NO format on save
  "editor.formatOnPaste": false,       // ❌ NO format on paste
  "editor.formatOnType": false,        // ❌ NO format while typing

  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "never",   // ❌ NO auto-fix ESLint
    "source.organizeImports": "never"  // ❌ NO organize imports
  },

  "javascript.suggest.autoImports": false,   // ❌ NO auto-imports
  "typescript.suggest.autoImports": false,   // ❌ NO auto-imports

  "editor.acceptSuggestionOnEnter": "off"    // ❌ NO suggestions on Enter
}
```

---

### **4. `.editorconfig`** - Cross-Editor Standards
**Location**: `/frontend/apps/marketing/.editorconfig`

**What it does**:
- Works with ANY editor (VSCode, Cursor, WebStorm, etc.)
- Sets basic formatting rules
- Ensures consistency across team members

**Settings**:
```ini
[*]
charset = utf-8
end_of_line = lf              # Unix line endings
insert_final_newline = true   # Add newline at end of file
trim_trailing_whitespace = true
indent_style = space
indent_size = 2
```

---

### **5. `.prettierignore`** - Files to Never Format
**Location**: `/frontend/apps/marketing/.prettierignore`

**What it does**:
- Prevents Prettier from touching certain files
- Protects build output, dependencies, etc.

**Ignored**:
- `node_modules/`
- `.next/`
- `dist/`
- `build/`
- Lock files
- Environment files

---

## 🚫 **What's DISABLED**

### **Auto-Formatting** ❌
- **Format on Save**: OFF
- **Format on Paste**: OFF
- **Format on Type**: OFF
- **ESLint Auto-Fix**: OFF

### **Auto-Imports** ❌
- **JavaScript auto-imports**: OFF
- **TypeScript auto-imports**: OFF
- **Organize imports on save**: OFF

### **Auto-Complete** ❌
- **Accept suggestion on Enter**: OFF
- You must use **Tab** or **click** to accept

---

## ✅ **What's ENABLED**

### **Warnings Only** ⚠️
- TypeScript errors
- React hooks warnings
- Accessibility warnings
- No auto-fixes, just highlights

### **Manual Formatting** ✅
- Press **Ctrl+Shift+F** (Windows) or **Cmd+Shift+F** (Mac)
- Formats current file using Prettier rules
- **YOU control when to format**

### **Consistent Indentation** ✅
- 2 spaces (enforced by EditorConfig)
- Works automatically as you type
- No reformatting of existing code

---

## 🎯 **How to Use**

### **Daily Workflow**

1. **Write Code** → IDE doesn't auto-format ✅
2. **Save File** (Ctrl+S) → No changes ✅
3. **ESLint shows warnings** → Red squiggles appear ⚠️
4. **You decide** → Manually fix or ignore
5. **Want to format?** → Press Ctrl+Shift+F ✅

---

### **Manual Format (When YOU Want)**

**Windows/Linux**:
```
Ctrl + Shift + F
```

**Mac**:
```
Cmd + Shift + F
```

**Right-click**:
```
Right-click file → Format Document
```

---

### **ESLint Check**

**Run manually**:
```bash
npm run lint
```

**Fix auto-fixable issues** (rare):
```bash
npm run lint -- --fix
```

---

## 🛠️ **IDE-Specific Setup**

### **VSCode / Cursor**
✅ **Already configured** via `.vscode/settings.json`

**Install these extensions** (optional):
1. **ESLint** - `dbaeumer.vscode-eslint`
2. **Tailwind CSS IntelliSense** - `bradlc.vscode-tailwindcss`
3. **EditorConfig** - `EditorConfig.EditorConfig`

**NO NEED** for Prettier extension!

---

### **WebStorm / IntelliJ**
1. Go to **Settings** → **Editor** → **Code Style**
2. Enable **EditorConfig** support
3. Disable **Reformat on save**
4. Disable **Optimize imports on save**

---

### **Cursor IDE**
✅ **Same as VSCode** - uses `.vscode/settings.json`

**Additional**:
1. Settings → Extensions → Disable **Format on Save**
2. Settings → Editor → Uncheck **Format on Paste**

---

## 📋 **Coding Standards**

### **TypeScript**
```typescript
// ✅ Good - No semicolons
const name = 'Inopsio'

// ❌ Bad - Has semicolon
const name = 'Inopsio';
```

### **React Components**
```tsx
// ✅ Good - Arrow function, named export
export default function Header() {
  return <div>Header</div>
}

// ✅ Good - Client component
'use client'

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light')
  return <button onClick={() => setTheme('dark')}>Toggle</button>
}
```

### **Imports**
```typescript
// ✅ Good - Absolute imports with @
import { Header } from '@/components/layout/Header'
import { useTheme } from '@/components/providers/ThemeProvider'

// ❌ Bad - Relative imports
import { Header } from '../../components/layout/Header'
```

### **Tailwind Classes**
```tsx
// ✅ Good - Multiple lines OK
<div className="
  flex items-center justify-between
  px-4 py-2
  bg-white dark:bg-gray-900
  rounded-lg shadow-lg
">

// ✅ Good - Single line also OK
<div className="flex items-center px-4 py-2">

// ⚠️ Warning - Very long lines (>100 chars)
// Prettier will suggest breaking, but won't auto-fix
```

---

## 🚨 **Troubleshooting**

### **Problem: IDE Still Auto-Formatting**

**Solution 1**: Reload VSCode/Cursor
```
Ctrl+Shift+P → "Reload Window"
```

**Solution 2**: Check conflicting extensions
```
Extensions → Search "format" → Disable any auto-formatters
```

**Solution 3**: Check global settings
```
File → Preferences → Settings
Search "format on save" → Ensure it's OFF globally
```

---

### **Problem: ESLint Not Working**

**Solution 1**: Restart ESLint server
```
Ctrl+Shift+P → "ESLint: Restart ESLint Server"
```

**Solution 2**: Check ESLint output
```
View → Output → Select "ESLint" from dropdown
```

**Solution 3**: Reinstall dependencies
```bash
npm install
```

---

### **Problem: Imports Getting Reorganized**

**Cause**: VSCode auto-organize imports is ON

**Fix**:
```
Settings → Search "organize imports"
Uncheck "Editor: Code Actions On Save"
```

---

### **Problem: Suggestions Annoying**

**Fix 1**: Disable auto-accept on Enter
```json
"editor.acceptSuggestionOnEnter": "off"
```

**Fix 2**: Disable suggestions completely
```json
"editor.quickSuggestions": {
  "other": false,
  "comments": false,
  "strings": false
}
```

---

## 📊 **Summary**

| Feature | Status | Control |
|---------|--------|---------|
| **Format on Save** | ❌ OFF | You format manually |
| **Format on Paste** | ❌ OFF | No auto-format |
| **ESLint Auto-Fix** | ❌ OFF | Manual fixes only |
| **Auto-Imports** | ❌ OFF | You import manually |
| **Organize Imports** | ❌ OFF | You organize manually |
| **EditorConfig** | ✅ ON | Passive (indent, EOL) |
| **ESLint Warnings** | ✅ ON | Shows errors only |
| **Manual Format** | ✅ ON | Ctrl+Shift+F when needed |

---

## 🎯 **Philosophy**

> **"YOU are in control, not the IDE"**

### **Core Principles**:
1. ✅ **Write code your way** - IDE won't change it
2. ⚠️ **See warnings** - Know about issues
3. 🎯 **Decide when to fix** - Manual control
4. 📝 **Format when ready** - Press Ctrl+Shift+F
5. 🚫 **No surprises** - Code stays as you wrote it

---

## 🔧 **Quick Commands**

| Action | Shortcut | What it does |
|--------|----------|--------------|
| **Save** | Ctrl+S | Just saves, no format |
| **Manual Format** | Ctrl+Shift+F | Formats current file |
| **Reload Window** | Ctrl+Shift+P → Reload | Restarts IDE |
| **ESLint Check** | Terminal: `npm run lint` | Shows all errors |
| **Type Check** | Terminal: `npm run type-check` | TypeScript errors |

---

## ✅ **Files Overview**

```
frontend/apps/marketing/
├── .eslintrc.json          ✅ ESLint rules (warnings only)
├── .prettierrc             ✅ Prettier config (manual only)
├── .prettierignore         ✅ Files to never format
├── .editorconfig           ✅ Cross-editor basics
├── .vscode/
│   └── settings.json       ✅ VSCode behavior (no auto-format)
├── tsconfig.json           ✅ TypeScript config (already good)
└── package.json            ✅ Scripts available
```

---

## 🎉 **Result**

You now have **FULL CONTROL** over your code:

✅ No auto-formatting
✅ No auto-imports
✅ No auto-fixes
✅ No surprises
✅ You decide when to format
✅ You decide when to fix warnings
✅ Consistent across team members
✅ Works with any editor

**The IDE is YOUR tool, not your boss!** 🚀

---

**Created**: October 2025
**Status**: ✅ Active
**For**: Inopsio Marketing Website
**Works with**: VSCode, Cursor, WebStorm, any editor with EditorConfig support

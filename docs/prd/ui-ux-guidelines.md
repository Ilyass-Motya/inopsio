**Inopsio UI/UX Design System & Interaction Guidelines**

### Purpose  
To establish consistent design, user experience, and accessibility principles that maintain product coherence across all front-end environments — marketing site, admin dashboard, platform modules, and InoSec suite.

***

### 1. Design System Overview
- **Primary Stack:** TailwindCSS + shadcn/ui + Radix UI  
- **Layout Framework:** Next.js (marketing), React (Vite) for admin and modules  
- **Typography Scale:** Inter Font – 400 to 700 weights  
- **Color Tokenization:**  
  - `--primary`: brand blue  
  - `--secondary`: accent purple  
  - `--success`: emerald  
  - `--error`: crimson  
  - `--neutral`: gray-100 to gray-950  
- **Dark Mode:** Fully supported, system-aware via CSS variables.  
- **Component Theming:** Each tenant can override color palettes using `/frontend/config/tenant-themes.json`.

**Link:** `/frontend/packages/ui/theme.config.ts`

***

### 2. Component Library Standards  

| Component | Source | Notes | Accessibility Spec |
|------------|---------|--------|-------------------|
| Buttons | shadcn/ui | Text, Icon, Outline, Destructive | WCAG 2.1 ARIA label required |
| Modals | Radix Dialog | Used for confirmations or info panels | Focus trap enabled |
| Forms | React Hook Form + Zod | Validation driven | ARIA role=form enforced |
| Tables | AG Grid / TanStack Table | Virtualized rendering for large datasets | Keyboard navigation supported |
| Charts | Recharts | Used for analytics dashboards | Alt text required for figures |
| Workflow Editor | React Flow / XYFlow | Interactive diagrams | Zoom and pan tooltips |
| Icons | Lucide React | Single consistent iconography source | Adjustable for color contrast |

**Link:** `/frontend/packages/ui/components/`

***

### 3. UX Principles  
1. **Clarity First** – Favor data visibility over decoration.  
2. **Task Efficiency** – Optimize clicks and interactions per workflow.  
3. **Consistency Across Modules** – Same behavior for buttons, tables, modals, navigation.  
4. **Safe Actions** – Double confirmation for destructive operations.  
5. **Feedback Loops** – Always visualize loading, saving, or error states.  

**Additional Reference:** `/docs/prd/v2.0.md#objectives` for UX-related goals.

***

### 4. Interaction Patterns  

| Pattern | Description | Modules Applied | Linked Docs |
|----------|--------------|------------------|--------------|
| Drag-Drop Pipelines | Drag leads/deals in CRM | CRM | `/frontend/apps/platform/modules/crm/components/` |
| Invoice Builder | Real-time editable PDF view | ERP | `/frontend/apps/platform/modules/erp/` |
| Visual Workflow | Node-based editor | Workflow | `/frontend/apps/platform/modules/workflows/` |
| Live Alerts Panel | Real-time monitoring feed | InoSec | `/frontend/apps/inosec/modules/core/` |
| Command Bar | Universal keyboard-driven navigation | Cross-app | `/frontend/packages/ui/` |

***

### 5. Accessibility and Compliance
- **Base Standard:** WCAG 2.1 AA  
- **Language Accessibility:** English, French, Arabic (RTL-compatible using `dir="rtl"`).  
- **Screen Reader Testing:** Automated with Playwright Axe-core plugin.  
- **Color Contrast Checks:** Tailwind lint rules and design-token testing.

**Links:**
- `/docs/compliance/accessibility.md`  
- `/docs/devops/testing/a11y-test-guide.md`

***

### 6. Responsive Design Standards  
- Mobile-first grid using Tailwind breakpoints.  
- All dashboards target resolutions from 1280×720 to 2560×1440.  
- Touch events supported for tablets on workflow and CRM modules.  
- Multi-domain branding consistency validated via CI test suite.

***

### 7. UX Research and Feedback Loop  
- Design proposals are documented in `/docs/design/research-proposals/`.  
- A/B testing results logged in `/docs/analytics/ui-feedback.md`.  
- Monthly design system sync led by Product Design Council.

***

### 8. Links and Cross-References  
| Section | Reference |
|----------|------------|
| PRD Core | `/docs/prd/v2.0.md` |
| Feature Map | `/docs/prd/feature-map.md` |
| Accessibility | `/docs/compliance/accessibility.md` |
| MVP Validation | `/docs/mvp/validation-report.md` |
| Development Guide | `/docs/dev/developer-handbook.md` |

***

### Expert Recommendation  
This file ensures all Inopsio interfaces (marketing, admin, tenant portals, and AI dashboards) maintain aesthetic coherence and functional clarity. It also provides a compliance-ready UX structure, enabling accessible design and multilingual support from day one.
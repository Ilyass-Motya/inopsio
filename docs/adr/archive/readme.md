**Inopsio ADR Archive – Record Version Control and Retention Policy**

***

### 1. Purpose  
This document explains how **deprecated or superseded Architecture Decision Records (ADRs)** are archived within the Inopsio project.  
It maintains transparency, traceability, and compliance alignment for all architectural changes made during the platform’s evolution.

**Linked Docs:**  
- `/docs/adr/index.md`  
- `/docs/governance/security-review-schedule.md`  
- `/docs/compliance/iso27001-controls.md`

***

### 2. Archive Structure  

```
docs/
└── adr/
    ├── archive/
    │   ├── adr-legacy-v1/
    │   │   ├── ADR-001_Initial-Monolith.md
    │   │   ├── ADR-002_MVP-Stack.md
    │   │   └── ADR-003_Infrastructure-v1.md
    │   ├── ADR-010_Superseded-Data-Model.md
    │   └── ADR-011_Deprecated-Auth-Flow.md
    └── readme.md
```

***

### 3. Archival Policy  

| Rule | Definition |
|-------|-------------|
| **Retention** | All ADRs remain stored for a minimum of 7 years or until system replacement. |
| **Naming Convention** | `ADR-[number]_[topic]-superseded.md` for clarity and historical order. |
| **Supersession Link** | Each archived ADR must reference its successor in the header. |
| **Approval Before Archival** | Superseding ADR must be approved by the Architecture Board and CTO. |
| **Access** | Archive files are read‑only; new modifications must create fresh ADRs. |

All changes logged through `/reports/governance/adr-review.log`.

***

### 4. File Metadata Header (Required For All Archived ADRs)  

Every archived ADR file must begin with:  

```yaml
---
id: ADR-008
status: superseded
superseded_by: ADR-020
date_archived: 2025-10-24
reason: architecture revision following Kubernetes transition.
archived_by: CTO / Architecture Board
tags: [legacy, deprecated, audit]
---
```

This ensures automatic reference by the ADR indexing workflow (`update-adr-index.yml`).

***

### 5. Supersession Workflow  

| Step | Action | Responsible | Output |
|--------|----------|---------------|-----------|
| 1 | Identify ADR to be replaced | Architecture Team | Change proposal ticket |
| 2 | Write new ADR document | Author / Architect | New ADR (PR) |
| 3 | Approve new ADR and mark old as superseded | CTO + Architecture Board | Approved commit |
| 4 | Move old ADR to archive directory | Documentation Lead | Archived file with metadata |
| 5 | Sync ADR Index and Archive Summary | Automation Bot | `/docs/adr/index.md` auto‑update |

***

### 6. Audit and Compliance Integration  

| Standard | Control | Evidence |
|------------|----------|-----------|
| ISO 27001 | A.12  – Change Management | Archived records of system transformation |
| SOC 2 | CC7.2  – Change Authorization | CTO‑signed supersession record |
| CNDP (Morocco) | Data Integrity Logs | Change trace stored in hash‑verified index |

Audit proof stored under `/docs/compliance/audit-artifacts/adr-archive/`.

***

### 7. Archive Review Cycle  

| Frequency | Action | Reviewer | Record |
|-------------|----------|------------|----------|
| Quarterly | Review for deprecated or obsolete ADRs | CTO, Compliance Officer | `adr-archive-review-QX.md` |
| Annually | Verify hash integrity against ADR checksum | Security Engineer | `sha256-verification.log` |

Verification script path: `/scripts/docs/verify-adr-archive.sh`.

***

### 8. Access and Integrity Controls  

- Archive directory version‑controlled (Git LFS + read‑only permissions).  
- File integrity validated via SHA‑256 checksum.  
- CI workflow prevents deletion or mass rename of archives.  
- Vault metadata retains ADR hash for audit consistency.

***

### 9. Linked Documents  

| File | Purpose |
|-------|----------|
| `/docs/adr/index.md` | Central index link to archived files |
| `/docs/adr/template.md` | Reference for ADR format standards |
| `/docs/compliance/iso27001-controls.md` | Architectural change control mapping |
| `/docs/governance/security-review-schedule.md` | Audit timeline and ADR review routine |

***

### Expert Recommendation  
This **ADR Archive Readme** completes your documentation cycle by introducing transparent lifecycle management for historical architecture decisions.  
It ensures every change in Inopsio’s infrastructure, frontend, and security architecture remains verifiably audited, version‑controlled, and retained for long‑term compliance evidence.
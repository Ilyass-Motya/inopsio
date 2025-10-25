# Shared TypeScript Types

This directory contains shared TypeScript interfaces, types, and type definitions used across all frontend applications in the Inopsio platform.

## Type Categories

### Core Types
- **User Types**: User profiles, authentication, and authorization
- **Tenant Types**: Multi-tenant configuration and isolation
- **API Types**: API request/response interfaces and schemas
- **Common Types**: Shared utility types and enums

### Application-Specific Types
- **CRM Types**: Customer relationship management interfaces
- **ERP Types**: Enterprise resource planning interfaces
- **Security Types**: Cybersecurity platform interfaces
- **Workflow Types**: Business process automation interfaces

### UI Component Types
- **Component Props**: React component prop interfaces
- **Theme Types**: Theming and styling type definitions
- **Form Types**: Form validation and submission types
- **Navigation Types**: Routing and navigation interfaces

## Type Organization

### Core Types (`/core/`)
```typescript
// User and authentication types
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  tenantId: string;
  permissions: Permission[];
}

export interface Tenant {
  id: string;
  name: string;
  domain: string;
  settings: TenantSettings;
  branding: BrandingConfig;
}
```

### API Types (`/api/`)
```typescript
// API request/response interfaces
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: ApiError[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationInfo;
  total: number;
}
```

### Component Types (`/components/`)
```typescript
// React component prop interfaces
export interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
  pagination?: PaginationProps;
}
```

## Type Safety Features

### Strict Type Checking
- **No Implicit Any**: All variables must have explicit types
- **Strict Null Checks**: Null and undefined handling
- **No Unused Locals**: Unused variables are flagged
- **No Unused Parameters**: Unused function parameters are flagged

### Generic Types
- **Reusable Components**: Generic components for type safety
- **API Clients**: Typed API client interfaces
- **Form Validation**: Type-safe form validation
- **State Management**: Typed state management interfaces

## Type Documentation

### JSDoc Comments
```typescript
/**
 * Represents a user in the system
 * @interface User
 * @property {string} id - Unique user identifier
 * @property {string} email - User email address
 * @property {string} name - User display name
 * @property {UserRole} role - User role and permissions
 * @property {string} tenantId - Associated tenant ID
 */
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  tenantId: string;
}
```

### Type Examples
- **Usage Examples**: Code examples for complex types
- **Migration Guides**: Type migration and upgrade guides
- **Best Practices**: TypeScript best practices and patterns
- **Common Patterns**: Reusable type patterns and utilities

## Type Validation

### Runtime Validation
- **Zod Schemas**: Runtime type validation with Zod
- **API Validation**: Request/response validation
- **Form Validation**: Client-side form validation
- **Data Transformation**: Type-safe data transformation

### Compile-Time Validation
- **TypeScript Compiler**: Strict type checking
- **ESLint Rules**: TypeScript-specific linting rules
- **Pre-commit Hooks**: Type checking in CI/CD pipeline
- **IDE Integration**: Real-time type checking in development

## Type Generation

### API Type Generation
- **OpenAPI to TypeScript**: Generate types from OpenAPI specs
- **GraphQL Codegen**: Generate types from GraphQL schemas
- **Database Types**: Generate types from database schemas
- **Automated Updates**: Automated type generation in CI/CD

### Type Maintenance
- **Version Control**: Type versioning and compatibility
- **Breaking Changes**: Type breaking change management
- **Migration Scripts**: Automated type migration scripts
- **Documentation**: Type change documentation and guides

## Best Practices

### Type Design
- **Consistent Naming**: Use consistent naming conventions
- **Clear Interfaces**: Design clear and intuitive interfaces
- **Generic Types**: Use generics for reusable components
- **Documentation**: Document complex types and interfaces

### Type Usage
- **Type Imports**: Use proper type imports and exports
- **Type Guards**: Use type guards for runtime type checking
- **Type Assertions**: Use type assertions carefully and sparingly
- **Type Narrowing**: Use type narrowing for better type safety

## Getting Started

1. **Install Dependencies**: Install TypeScript and type dependencies
2. **Configure TypeScript**: Set up TypeScript configuration
3. **Import Types**: Import types in your components
4. **Type Validation**: Set up runtime type validation

For detailed type definitions and examples, see the individual type files and documentation.
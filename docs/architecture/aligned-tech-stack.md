# Aligned Tech Stack Architecture

## Overview

This document outlines the **aligned tech stack** implementation based on your specific requirements:

- **Marketing Website**: Next.js + Tailwind + shadcn/ui
- **Admin Dashboard**: React (Vite) + Tailwind
- **Backend**: Hybrid NestJS + FastAPI Strategy

## Frontend Architecture

### **1. Marketing Website - Next.js + Tailwind + shadcn/ui**

#### **Technology Stack**
```json
{
  "framework": "Next.js 14",
  "styling": "Tailwind CSS",
  "components": "shadcn/ui + Radix UI",
  "state": "Zustand + TanStack Query",
  "forms": "React Hook Form + Zod",
  "animations": "Framer Motion"
}
```

#### **Key Features**
- ✅ **App Router** for better performance
- ✅ **shadcn/ui components** for consistent design
- ✅ **Tailwind CSS** for utility-first styling
- ✅ **Heroicons React** for consistent icon system (NO custom SVG icons)
- ✅ **SEO optimization** with Next.js metadata API
- ✅ **Blog system** with CMS integration
- ✅ **Multi-page structure** with complex navigation

#### **Package Dependencies**
```json
{
  "next": "^14.0.0",
  "tailwindcss": "^3.3.0",
  "@radix-ui/react-*": "Latest",
  "class-variance-authority": "^0.7.0",
  "tailwind-merge": "^2.0.0",
  "@heroicons/react": "^2.0.0"
}
```

### **2. Admin Dashboard - React (Vite) + Tailwind**

#### **Technology Stack**
```json
{
  "framework": "React 18",
  "bundler": "Vite",
  "styling": "Tailwind CSS",
  "components": "shadcn/ui + Radix UI",
  "routing": "React Router DOM",
  "state": "Zustand + TanStack Query"
}
```

#### **Key Features**
- ✅ **Vite** for fast development and building
- ✅ **React Router** for client-side routing
- ✅ **Tailwind CSS** for styling
- ✅ **shadcn/ui components** for consistency
- ✅ **Hot Module Replacement** for fast development
- ✅ **TypeScript** support with path mapping

#### **Package Dependencies**
```json
{
  "react": "^18.2.0",
  "vite": "^5.0.0",
  "react-router-dom": "^6.20.0",
  "tailwindcss": "^3.3.0",
  "@radix-ui/react-*": "Latest"
}
```

### **3. Shared Packages Architecture**

#### **@inopsio/ui Package**
- **Purpose**: Shared UI components and design system
- **Components**: Button, Input, Card, Modal, Table, Form, Layout
- **Dependencies**: Radix UI, Tailwind CSS, Framer Motion
- **Usage**: Imported by both marketing and admin dashboard

#### **@inopsio/auth Package**
- **Purpose**: Authentication utilities and components
- **Features**: Login/Register forms, session management
- **Dependencies**: NextAuth, JWT, Axios

#### **@inopsio/api Package**
- **Purpose**: API client and data fetching
- **Features**: HTTP client, request/response interceptors
- **Dependencies**: Axios, SWR, React Query

#### **@inopsio/utils Package**
- **Purpose**: Shared utility functions
- **Features**: Formatting, validation, React utilities
- **Dependencies**: Lodash, date-fns, clsx

## Backend Architecture

### **Hybrid NestJS + FastAPI Strategy**

#### **NestJS Services (Business Logic)**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Auth Service  │    │   User Service  │    │   CRM Service   │
│   (NestJS)      │    │   (NestJS)      │    │   (NestJS)      │
│                 │    │                 │    │                 │
│ • Authentication│    │ • User Profiles │    │ • Lead Mgmt     │
│ • Authorization │    │ • Preferences   │    │ • Contact Mgmt  │
│ • JWT Tokens    │    │ • Settings      │    │ • Sales Pipeline│
└─────────────────┘    └─────────────────┘    └─────────────────┘

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   ERP Service   │    │  Email Service  │    │ Workflow Service│
│   (NestJS)      │    │   (NestJS)      │    │   (NestJS)      │
│                 │    │                 │    │                 │
│ • Inventory     │    │ • Email Campaign│    │ • Process Def   │
│ • Order Mgmt    │    │ • Templates     │    │ • Execution     │
│ • Financial     │    │ • Automation    │    │ • Task Mgmt     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

#### **FastAPI Services (AI/ML & Security)**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   AI Service    │    │ InoSec Core     │    │ InoSec Edge     │
│   (FastAPI)     │    │   (FastAPI)     │    │   (FastAPI)     │
│                 │    │                 │    │                 │
│ • Model Mgmt    │    │ • Threat Detect │    │ • Device Mgmt   │
│ • Inference     │    │ • Security Anal │    │ • Data Collect  │
│ • Training      │    │ • Incident Resp │    │ • Edge Analytics│
│ • Evaluation    │    │ • Compliance    │    │ • Device Monitor│
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### **Service Communication**

#### **API Gateway (NestJS)**
```typescript
// Routes requests to appropriate services
@Controller('api')
export class ApiGatewayController {
  @Get('auth/*')
  async authRoute() {
    // Route to Auth Service
  }
  
  @Get('ai/*')
  async aiRoute() {
    // Route to AI Service (FastAPI)
  }
  
  @Get('inosec/*')
  async inosecRoute() {
    // Route to InoSec Services (FastAPI)
  }
}
```

#### **Inter-Service Communication**
```typescript
// NestJS to FastAPI communication
@Injectable()
export class AiServiceClient {
  private readonly aiServiceUrl = 'http://ai-service:8000';
  
  async getModelPredictions(data: any) {
    const response = await this.httpService.axiosRef.post(
      `${this.aiServiceUrl}/api/v1/inference/predict`,
      data
    );
    return response.data;
  }
}
```

## Development Workflow

### **Frontend Development**

#### **Marketing Website (Next.js)**
```bash
# Development
cd frontend/apps/marketing
npm run dev

# Build
npm run build

# Production
npm run start
```

#### **Admin Dashboard (Vite)**
```bash
# Development
cd frontend/apps/admin-dashboard
npm run dev

# Build
npm run build

# Preview
npm run preview
```

#### **Shared Packages**
```bash
# Build all packages
npm run build --workspace=@inopsio/ui
npm run build --workspace=@inopsio/auth
npm run build --workspace=@inopsio/api
npm run build --workspace=@inopsio/utils
```

### **Backend Development**

#### **NestJS Services**
```bash
# Development
cd backend
npm run dev

# Individual service
cd backend/auth-service
npm run dev
```

#### **FastAPI Services**
```bash
# AI Service
cd backend/ai-service
pip install -r requirements.txt
uvicorn main:app --reload

# InoSec Services
cd backend/inosec-core-service
pip install -r requirements.txt
uvicorn main:app --reload
```

## Deployment Strategy

### **Frontend Deployment**

#### **Marketing Website**
- **Platform**: Vercel
- **Domain**: inopsio.com
- **Features**: Automatic deployments, CDN, edge functions

#### **Admin Dashboard**
- **Platform**: Vercel or Netlify
- **Domain**: admin.inopsio.com
- **Features**: SPA routing, static hosting

### **Backend Deployment**

#### **NestJS Services**
- **Platform**: Docker containers on Kubernetes
- **Database**: PostgreSQL with Redis caching
- **Monitoring**: Prometheus + Grafana

#### **FastAPI Services**
- **Platform**: Docker containers on Kubernetes
- **Database**: PostgreSQL + TimescaleDB (for time-series data)
- **ML Models**: S3 storage with model versioning

## Benefits of This Architecture

### **✅ Technology Alignment**
- **Next.js + Tailwind + shadcn/ui** for marketing website
- **React (Vite) + Tailwind** for admin dashboard
- **Hybrid NestJS + FastAPI** for backend services

### **✅ Performance Benefits**
- **Vite** for fast development and building
- **Next.js App Router** for better performance
- **FastAPI** for high-performance AI/ML workloads
- **NestJS** for robust business logic

### **✅ Developer Experience**
- **Shared packages** for code reusability
- **TypeScript** throughout for type safety
- **Hot Module Replacement** for fast development
- **Comprehensive tooling** with ESLint, Prettier, Jest

### **✅ Scalability**
- **Independent deployment** for each service
- **Microservices architecture** for horizontal scaling
- **Cloud-native** deployment with Kubernetes
- **Service mesh** for communication

## Next Steps

1. **Complete Package Implementation**: Finish all shared package components
2. **App Development**: Develop marketing website and admin dashboard
3. **Service Integration**: Connect NestJS and FastAPI services
4. **Testing**: Comprehensive testing across all services
5. **Deployment**: Set up CI/CD for production deployment

## Conclusion

This aligned architecture provides:
- ✅ **Optimal technology choices** for each use case
- ✅ **Shared component architecture** for consistency
- ✅ **Hybrid backend strategy** for best performance
- ✅ **Modern development practices** throughout
- ✅ **Scalable and maintainable** codebase

The result is a **production-ready architecture** that leverages the best tools for each specific use case while maintaining consistency and reusability across the platform.

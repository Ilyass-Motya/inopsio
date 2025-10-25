// CRM Module - Micro-frontend entry point
export { default as CRMModule } from './components/CRMModule';
export { default as LeadManagement } from './components/LeadManagement';
export { default as ContactManagement } from './components/ContactManagement';
export { default as SalesPipeline } from './components/SalesPipeline';
export { default as CustomerAnalytics } from './components/CustomerAnalytics';

// Hooks
export { useLeads } from './hooks/useLeads';
export { useContacts } from './hooks/useContacts';
export { useSalesPipeline } from './hooks/useSalesPipeline';
export { useCustomerAnalytics } from './hooks/useCustomerAnalytics';

// Types
export type { Lead, Contact, Opportunity, Customer } from './types/crm';

// API
export { crmApi } from './api/crmApi';

// Module configuration
export const crmModuleConfig = {
  name: 'CRM',
  version: '1.0.0',
  description: 'Customer Relationship Management Module',
  routes: [
    { path: '/leads', component: 'LeadManagement' },
    { path: '/contacts', component: 'ContactManagement' },
    { path: '/pipeline', component: 'SalesPipeline' },
    { path: '/analytics', component: 'CustomerAnalytics' },
  ],
  permissions: ['crm:read', 'crm:write', 'crm:admin'],
  dependencies: ['@inopsio/ui', '@inopsio/auth', '@inopsio/api'],
};

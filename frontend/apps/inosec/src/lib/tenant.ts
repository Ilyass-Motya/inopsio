export interface TenantConfig {
  id: string;
  name: string;
  description: string;
  domain: string;
  subdomain: string;
  logo?: string;
  favicon?: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    textColor: string;
  };
  features: string[];
  settings: Record<string, any>;
}

// Mock tenant data - in production, this would come from your database
const tenants: Record<string, TenantConfig> = {
  'acme': {
    id: 'acme',
    name: 'ACME Corp',
    description: 'ACME Corporation Security Platform',
    domain: 'acme.inosec.com',
    subdomain: 'acme',
    logo: '/logos/acme.png',
    favicon: '/favicons/acme.ico',
    theme: {
      primaryColor: '#3B82F6',
      secondaryColor: '#1E40AF',
      backgroundColor: '#FFFFFF',
      textColor: '#1F2937',
    },
    features: ['core', 'edge', 'one'],
    settings: {
      timezone: 'America/New_York',
      language: 'en',
      notifications: true,
    },
  },
  'techcorp': {
    id: 'techcorp',
    name: 'TechCorp Industries',
    description: 'TechCorp Industries Security Solutions',
    domain: 'techcorp.inosec.com',
    subdomain: 'techcorp',
    logo: '/logos/techcorp.png',
    favicon: '/favicons/techcorp.ico',
    theme: {
      primaryColor: '#10B981',
      secondaryColor: '#059669',
      backgroundColor: '#F9FAFB',
      textColor: '#111827',
    },
    features: ['core', 'edge'],
    settings: {
      timezone: 'Europe/London',
      language: 'en',
      notifications: true,
    },
  },
};

export async function getTenantConfig(tenantId: string): Promise<TenantConfig | null> {
  // In production, this would fetch from your database
  return tenants[tenantId] || null;
}

export async function getAllTenants(): Promise<TenantConfig[]> {
  return Object.values(tenants);
}

export function getTenantFromDomain(hostname: string): string | null {
  const parts = hostname.split('.');
  if (parts.length >= 3 && parts[1] === 'inosec' && parts[2] === 'com') {
    return parts[0];
  }
  return null;
}

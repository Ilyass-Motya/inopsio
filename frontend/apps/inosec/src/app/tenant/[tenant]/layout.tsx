import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { TenantProvider } from '@/components/TenantProvider';
import { getTenantConfig } from '@/lib/tenant';

interface TenantLayoutProps {
  children: React.ReactNode;
  params: {
    tenant: string;
  };
}

export default async function TenantLayout({ children, params }: TenantLayoutProps) {
  const headersList = headers();
  const tenant = params.tenant;
  
  // Validate tenant
  const tenantConfig = await getTenantConfig(tenant);
  if (!tenantConfig) {
    notFound();
  }

  return (
    <TenantProvider tenant={tenantConfig}>
      <div className="min-h-screen bg-background">
        {children}
      </div>
    </TenantProvider>
  );
}

export async function generateMetadata({ params }: { params: { tenant: string } }) {
  const tenantConfig = await getTenantConfig(params.tenant);
  
  return {
    title: tenantConfig?.name || 'InoSec',
    description: tenantConfig?.description || 'Multi-tenant security platform',
    icons: {
      icon: tenantConfig?.favicon || '/favicon.ico',
    },
  };
}

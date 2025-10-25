import React, { useState } from 'react';
import { Button } from '@inopsio/ui';
import { useAuth } from '@inopsio/auth';
import { apiClient } from '@inopsio/api';
import { cn } from '@inopsio/utils';

// Import all modules
import { CRMModule } from '@inopsio/platform-crm';
import { ERPModule } from '@inopsio/platform-erp';
import { EmailModule } from '@inopsio/platform-email';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<string>('crm');
  const { user, isAuthenticated } = useAuth();

  const modules = [
    { id: 'crm', name: 'CRM', component: CRMModule },
    { id: 'erp', name: 'ERP', component: ERPModule },
    { id: 'email', name: 'Email', component: EmailModule },
  ];

  const ActiveModule = modules.find(m => m.id === activeModule)?.component;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Inopsio Playground
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <span className="text-sm text-gray-700">
                  Welcome, {user?.name}
                </span>
              ) : (
                <Button variant="outline" size="sm">
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {modules.map((module) => (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                className={cn(
                  'py-4 px-1 border-b-2 font-medium text-sm',
                  activeModule === module.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                )}
              >
                {module.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {ActiveModule && <ActiveModule />}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            Inopsio Development Playground - Testing all modules and components
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;

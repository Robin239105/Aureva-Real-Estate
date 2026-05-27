import React from 'react';
import ReactDOM from 'react-dom/client';
import './admin.css';
import { ClerkProvider } from '@clerk/react';
import { Toaster } from 'sonner';
import AdminApp from './AdminApp.jsx';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function SetupRequired() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-ivory">
      <div className="max-w-lg w-full bg-white border border-border rounded-sm p-10 shadow-md">
        <div className="eyebrow mb-3">Setup required</div>
        <h1 className="font-serif text-3xl text-navy tracking-tight">
          Connect Clerk to enable sign-in.
        </h1>
        <p className="text-sm text-slate mt-3 leading-relaxed">
          The admin console uses Clerk for authentication. Add your publishable key as an
          environment variable, then redeploy.
        </p>
        <pre className="mt-6 p-4 bg-navy text-ivory font-mono text-xs rounded-sm overflow-auto">
          VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxx{'\n'}CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxx
        </pre>
        <ol className="mt-5 text-sm text-foreground space-y-2 list-decimal pl-5">
          <li>
            Create an app at{' '}
            <a
              className="text-gold-deep underline"
              href="https://dashboard.clerk.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              dashboard.clerk.com
            </a>
          </li>
          <li>Copy the API keys</li>
          <li>Add them in Vercel → Project → Settings → Environment Variables</li>
          <li>Redeploy</li>
        </ol>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('admin-root'));

if (!PUBLISHABLE_KEY) {
  root.render(
    <React.StrictMode>
      <SetupRequired />
    </React.StrictMode>
  );
} else {
  root.render(
    <React.StrictMode>
      <ClerkProvider
        afterSignOutUrl="/admin"
        appearance={{
          variables: {
            colorPrimary: '#C9A45C',
            colorText: '#1E293B',
            colorBackground: '#F8F5EF',
            colorInputBackground: '#ffffff',
            colorInputText: '#1E293B',
            fontFamily: 'Inter, system-ui, sans-serif',
            borderRadius: '4px',
          },
        }}
      >
        <AdminApp />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#fff',
              color: '#1E293B',
              border: '1px solid rgba(11,18,32,0.1)',
            },
          }}
        />
      </ClerkProvider>
    </React.StrictMode>
  );
}

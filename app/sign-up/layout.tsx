'use client';

import { Suspense } from 'react';

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="mx-auto w-full max-w-7xl z-40 relative min-h-[calc(100vh-140px)]">
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        }>
          {children}
        </Suspense>
      </main>
    </>
  );
}
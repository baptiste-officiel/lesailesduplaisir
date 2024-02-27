// app/Providers.
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren, useState } from 'react';
import { Toaster } from 'sonner';


export const Providers = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient())

  return (
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <SessionProvider>
            {children}
        </SessionProvider>
      </QueryClientProvider>
  );
};


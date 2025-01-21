import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { AppProviders } from '@/components/providers/app-providers';
import { signInRoute } from '@/config/routes';
import './globals.css';

const font = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SmartFlow',
  description: 'Automate workflows and streamline processes with SmartFlow.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      afterSignOutUrl={signInRoute}
      appearance={{
        elements: {
          formButtonPrimary: 'bg-primary hover:bg-primary/90 text-sm !shadow-none',
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={font.className}>
          <AppProviders>{children}</AppProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}

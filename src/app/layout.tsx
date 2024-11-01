import { ReactNode } from 'react';
import { Metadata } from 'next';
import '../assets/styles/global.scss';
import { ThemeWrapper } from '@/lib/providers/ThemeWrapper/ThemeWrapper';
import { ModalsProvider } from '@/lib/services/Modals';
import { inter, poppins } from '@/assets/fonts/fonts';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { QueryProvider } from '@/lib/providers/QueryProvider/QueryProvider';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html className={`${inter.variable} ${poppins.variable}`} lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeWrapper>
            <QueryProvider>
              <ModalsProvider>{children}</ModalsProvider>
            </QueryProvider>
          </ThemeWrapper>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

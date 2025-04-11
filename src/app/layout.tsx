import { ReactNode, Suspense } from 'react';
import { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import '../assets/styles/global.scss';
import { ThemeWrapper } from '@/lib/providers/ThemeWrapper/ThemeWrapper';
import { ModalsProvider } from '@/lib/services/Modals';
import { inter, poppins } from '@/assets/fonts/fonts';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ChartsProvider } from '@/lib/charts';
import { QueryProvider } from '@/lib/providers/QueryProvider/QueryProvider';

export const metadata: Metadata = {
  title: 'Vendi+',
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
              <ChartsProvider>
                <ModalsProvider>
                  <Suspense>{children}</Suspense>

                  <ToastContainer position={'bottom-right'} />
                </ModalsProvider>
              </ChartsProvider>
            </QueryProvider>
          </ThemeWrapper>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

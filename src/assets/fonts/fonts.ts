import localFont from 'next/font/local';

export const inter = localFont({
  src: [
    {
      path: '../../../public/fonts/Inter_24pt-Regular.ttf',
      weight: '400',
    },
    {
      path: '../../../public/fonts/Inter_24pt-Medium.ttf',
      weight: '500',
    },
    {
      path: '../../../public/fonts/Inter_24pt-SemiBold.ttf',
      weight: '600',
    },
  ],
  variable: '--font-inter',
  display: 'swap',
});

export const poppins = localFont({
  src: [
    {
      path: '../../../public/fonts/Poppins-Regular.ttf',
      weight: '400',
    },
    {
      path: '../../../public/fonts/Poppins-Medium.ttf',
      weight: '500',
    },
    {
      path: '../../../public/fonts/Poppins-SemiBold.ttf',
      weight: '600',
    },
  ],
  variable: '--font-poppins',
  display: 'swap',
});

import { ThemeSwitcher } from '@/components/theme-switcher';
import { Geist } from 'next/font/google';
import '@/app/globals.css';
import Image from 'next/image';

import SignOutButton from './sign-out-button';
import { SessionProvider } from 'next-auth/react';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

// export const metadata = {
//   metadataBase: new URL(defaultUrl),
//   title: 'Next.js and Supabase Starter Kit',
//   description: 'The fastest way to build apps with Next.js and Supabase',
// };

const geistSans = Geist({
  display: 'swap',
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mt-3 mx-5 ">
      <div className=" flex  justify-center">
        <nav className=" bg-background dark:bg-neutral-900 w-full top-2 dark:drop-shadow-none drop-shadow-md border rounded-2xl">
          <div className="flex justify-between   items-center p-4 gap-x-3 ">
            <div className="flex items-center gap-x-3">
              <p className="text-2xl md:text-4xl bg-gradient-to-r inline-block text-transparent bg-clip-text from-blue-600 to-pink-400">
                Make it Work
              </p>
              <Image
                src={'/logo_to_do.png'}
                width={30}
                height={30}
                alt={'xxx'}
              />
            </div>
            <div>
              <ThemeSwitcher />
            </div>
          </div>
        </nav>
      </div>

      <SessionProvider refetchOnWindowFocus={false}>{children}</SessionProvider>
    </div>
  );
}

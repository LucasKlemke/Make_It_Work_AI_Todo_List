import { ThemeSwitcher } from '@/components/theme-switcher';
import { Geist } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import Image from 'next/image';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Next.js and Supabase Starter Kit',
  description: 'The fastest way to build apps with Next.js and Supabase',
};

const geistSans = Geist({
  display: 'swap',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen mx-5 mt-2 flex flex-col gap-y-6">
            <div className=" flex  justify-center">
              <nav className=" bg-background w-full top-2 dark:drop-shadow-none drop-shadow-md border rounded-2xl">
                <div className="flex justify-between   items-center p-4 gap-x-3 ">
                  <div className="flex items-center gap-x-3">
                    <p className="text-4xl bg-gradient-to-r inline-block text-transparent bg-clip-text from-blue-600 to-pink-400">
                      Make it Work
                    </p>
                    <Image
                      src={'/logo_to_do.png'}
                      width={30}
                      height={30}
                      alt={'xxx'}
                    />
                  </div>
                  <ThemeSwitcher />
                </div>
              </nav>
            </div>

            <div>{children}</div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

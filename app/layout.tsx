import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/SessionProvider";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeOptions = {
    // attribute: "class",
    defaultTheme: "blue",
    enableSystem: true,
  };
  return (
    <html lang="en" suppressHydrationWarning >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider >
          <ThemeProvider {...themeOptions} attribute={"class"}>
          <div className="w-[220px] h-[100px] bg-primary opacity-30 rounded-full fixed -z-10 top-0 left-0 blur-[100px]"></div>
            <div className="w-[320px] h-[50px] bg-primary opacity-30 rounded-full fixed -z-10 top-40 right-0 blur-[100px]"></div>
            <div className="w-[520px] h-[300px] bg-primary opacity-20 rounded-full fixed -z-10 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] blur-[160px]"></div>
            {children}
          
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

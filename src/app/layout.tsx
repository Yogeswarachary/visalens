import "./globals.css";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "VisaLens",
  description: "Visa assistance and document readiness dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
  <html lang="en" className={cn("dark font-sans antialiased", geist.variable)} suppressHydrationWarning>
    <body className="bg-background text-foreground min-h-screen">
      {children}
    </body>
  </html>
);
}

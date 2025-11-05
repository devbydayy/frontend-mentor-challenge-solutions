import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "@/context/AppProviders";

export const metadata: Metadata = {
  title: "Personal Finance App",
  description: "Keep track of your money and save for your future",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}

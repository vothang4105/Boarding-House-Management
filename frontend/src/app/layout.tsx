import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MBHMS - Mini Boarding House Management System",
  description: "Hệ thống Quản lý Nhà trọ Mini",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}

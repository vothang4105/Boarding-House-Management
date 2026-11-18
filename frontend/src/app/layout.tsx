import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-be-vietnam-pro",
});

export const metadata: Metadata = {
  title: "MBHMS - Hệ thống Quản lý Nhà trọ Mini",
  description: "Giải pháp quản lý phòng trọ, điện nước offline, hóa đơn tự động và VietQR SePay dành cho chủ trọ",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`h-full ${beVietnamPro.variable}`}>
      <body className="min-h-full flex flex-col font-sans antialiased text-foreground bg-background">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}

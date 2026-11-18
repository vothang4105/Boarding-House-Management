"use client";

import * as React from "react";
import Link from "next/link";
import { Bell, Wifi, WifiOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  title?: string;
}

export function Header({ title = "Hệ thống Quản lý Nhà trọ" }: HeaderProps) {
  const [isOnline, setIsOnline] = React.useState(true);

  React.useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur-md sm:px-6">
      {/* Left: Mobile Title or Desktop Breadcrumb */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 md:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground text-sm">
            M
          </div>
          <span className="font-bold text-sm tracking-tight text-foreground truncate max-w-[140px] sm:max-w-none">
            MBHMS
          </span>
        </div>
        <div className="hidden md:flex md:items-center">
          <h1 className="text-base font-semibold text-foreground tracking-tight">
            {title}
          </h1>
        </div>
      </div>

      {/* Right: Network Status, Notifications & Quick Actions */}
      <div className="flex items-center gap-2">
        {/* Network Connectivity Badge (NFR-09 Offline indicator) */}
        <div className="flex items-center">
          {isOnline ? (
            <Badge
              variant="outline"
              className="gap-1 border-emerald-300 text-emerald-700 bg-emerald-50 text-[11px] py-0.5 px-2"
            >
              <Wifi className="h-3 w-3 text-emerald-600" />
              <span className="hidden sm:inline">Trực tuyến</span>
            </Badge>
          ) : (
            <Badge
              variant="warning"
              className="gap-1 text-[11px] py-0.5 px-2 animate-pulse"
            >
              <WifiOff className="h-3 w-3" />
              <span>Ngoại tuyến (Offline)</span>
            </Badge>
          )}
        </div>

        {/* Notifications Button (FR-36 In-app alerts) */}
        <button
          type="button"
          aria-label="Thông báo hệ thống"
          className="relative flex h-11 w-11 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-2.5 right-2.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
        </button>

        {/* Quick User Avatar on Mobile */}
        <Link
          href="/portal"
          className="flex h-11 w-11 items-center justify-center rounded-lg md:hidden"
          aria-label="Tài khoản cá nhân"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
            CL
          </div>
        </Link>
      </div>
    </header>
  );
}

"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  BedDouble,
  Receipt,
  Zap,
  Wrench,
  BarChart3,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const mainNavItems: SidebarItem[] = [
  { label: "Trang chủ & Kiểm tra", href: "/", icon: LayoutDashboard },
  { label: "Bảng điều khiển", href: "/admin/dashboard", icon: BarChart3 },
  { label: "Danh sách phòng", href: "/rooms", icon: BedDouble },
  { label: "Dãy trọ", href: "/admin/dashboard#buildings", icon: Building2 },
  { label: "Ghi điện nước (Offline)", href: "/admin/dashboard#utility", icon: Zap },
  { label: "Hóa đơn & QR SePay", href: "/admin/dashboard#invoices", icon: Receipt },
  { label: "Sự cố & Sửa chữa", href: "/admin/dashboard#tickets", icon: Wrench },
  { label: "Cổng cư dân", href: "/portal", icon: ShieldCheck },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-30 border-r border-border bg-card">
      {/* Brand Header */}
      <div className="flex items-center h-16 px-6 border-b border-border gap-3">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-primary-foreground font-bold text-lg shadow-sm">
          M
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-sm tracking-tight text-foreground">
            MBHMS
          </span>
          <span className="text-[11px] text-muted-foreground leading-none">
            Quản lý nhà trọ mini
          </span>
        </div>
      </div>

      {/* Nav Menu */}
      <div className="flex-1 flex flex-col justify-between overflow-y-auto px-3 py-4">
        <nav className="space-y-1">
          <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Menu Quản trị
          </div>
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon
                  className={cn(
                    "w-4 h-4 transition-colors",
                    isActive
                      ? "text-primary-foreground"
                      : "text-muted-foreground group-hover:text-foreground"
                  )}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Profile / Logout */}
        <div className="pt-4 border-t border-border mt-4">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-muted/50 mb-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-xs">
              CL
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground truncate">
                Chị Lan (Chủ trọ)
              </p>
              <p className="text-[10px] text-muted-foreground truncate">
                admin@mbhms.vn
              </p>
            </div>
          </div>
          <Link
            href="/login"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Đăng xuất</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}

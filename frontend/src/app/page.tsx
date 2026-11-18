"use client";

import * as React from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatVND, formatDateTimeVN, getRoomStatusBadgeVariant } from "@/lib/formatters";
import { getHealthStatus } from "@/lib/api-client";
import { type HealthCheckData } from "@/types/api";
import { RoomStatus } from "@/types/domain";
import {
  Activity,
  BedDouble,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

const sampleRooms = [
  {
    id: "r1",
    roomNumber: "P.101",
    building: "Dãy A (Tầng 1)",
    price: 2500000,
    status: RoomStatus.Available,
    statusText: "Trống",
  },
  {
    id: "r2",
    roomNumber: "P.102",
    building: "Dãy A (Tầng 1)",
    price: 2800000,
    status: RoomStatus.Rented,
    statusText: "Đang thuê",
    tenantName: "Nguyễn Văn A",
  },
  {
    id: "r3",
    roomNumber: "P.201",
    building: "Dãy B (Tầng 2)",
    price: 3200000,
    status: RoomStatus.Reserved,
    statusText: "Đặt cọc",
    depositDate: "Hẹn nhận phòng 01/12",
  },
  {
    id: "r4",
    roomNumber: "P.202",
    building: "Dãy B (Tầng 2)",
    price: 3000000,
    status: RoomStatus.Maintenance,
    statusText: "Đang bảo trì",
    note: "Thay máy lạnh & vòi sen",
  },
];

export default function HomePage() {
  const [health, setHealth] = React.useState<HealthCheckData | null>(null);
  const [healthLoading, setHealthLoading] = React.useState(true);
  const [healthError, setHealthError] = React.useState<string | null>(null);
  const [currentTimeVN, setCurrentTimeVN] = React.useState<string>("");

  const checkHealth = React.useCallback(async () => {
    setHealthLoading(true);
    setHealthError(null);
    try {
      const response = await getHealthStatus();
      setHealth(response.data);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Không thể kết nối đến Backend .NET 10";
      setHealthError(errorMsg);
    } finally {
      setHealthLoading(false);
    }
  }, []);

  React.useEffect(() => {
    checkHealth();
    setCurrentTimeVN(formatDateTimeVN(new Date()));
    const timer = setInterval(() => {
      setCurrentTimeVN(formatDateTimeVN(new Date()));
    }, 1000);
    return () => clearInterval(timer);
  }, [checkHealth]);

  return (
    <AppShell title="MBHMS - Kiểm tra Hệ thống & Chuẩn Giao diện">
      <div className="space-y-6">
        {/* Banner Welcome */}
        <div className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-background to-primary/5 p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ngày 8: Dựng Khung Frontend & Chuẩn Thiết kế Impeccable</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Hệ thống Quản lý Nhà trọ Mini (MBHMS)
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
                Cấu trúc Next.js App Router, shadcn/ui, lưu trữ Offline Dexie.js và font chữ Be Vietnam Pro chuẩn tiếng Việt.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/admin/dashboard">
                <Button className="min-h-[44px] gap-2">
                  <span>Vào Dashboard</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Section 1: Backend Connection & Health Check */}
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                <CardTitle className="text-base sm:text-lg">
                  Kiểm tra Kết nối Backend .NET 10 (`GET /api/health`)
                </CardTitle>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={checkHealth}
                disabled={healthLoading}
                className="gap-2 min-h-[36px] w-fit"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${healthLoading ? "animate-spin" : ""}`} />
                <span>Kiểm tra lại</span>
              </Button>
            </div>
            <CardDescription>
              Xác thực thông suốt CORS giữa Frontend Next.js và Backend .NET 10 Clean Architecture.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {healthLoading ? (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted text-xs text-muted-foreground animate-pulse">
                <RefreshCw className="w-4 h-4 animate-spin text-primary" />
                <span>Đang kết nối tới Backend tại `http://localhost:5143/api/health`...</span>
              </div>
            ) : health ? (
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-950/20 space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="font-semibold text-sm text-emerald-700 dark:text-emerald-400">
                    Kết nối Backend Thành Công - Trạng thái: {health.status}
                  </span>
                  <Badge variant="success" className="ml-auto">
                    200 OK
                  </Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1 text-emerald-900 dark:text-emerald-200">
                  <div>
                    Múi giờ hệ thống: <strong>{health.timeZone || "Asia/Ho_Chi_Minh (UTC+7)"}</strong>
                  </div>
                  <div>
                    Thời gian máy chủ: <strong>{health.serverTime}</strong>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/20 space-y-2">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-amber-600" />
                  <span className="font-semibold text-sm text-amber-800 dark:text-amber-300">
                    Backend .NET 10 Chưa Khởi Chạy hoặc Offline
                  </span>
                  <Badge variant="warning" className="ml-auto">
                    Chế độ Độc lập
                  </Badge>
                </div>
                <p className="text-xs text-amber-900/80 dark:text-amber-200">
                  {healthError || "Chạy `dotnet run --project backend/src/MBHMS.WebApi` để khởi động máy chủ API."}
                </p>
              </div>
            )}

            {/* Core Constraints Verification Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-lg border bg-card space-y-1">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-primary" /> Múi giờ Việt Nam UTC+7 (NFR-13)
                </span>
                <p className="text-sm font-bold text-foreground">
                  {currentTimeVN || "Đang tải giờ..."}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Đảm bảo tự động chốt điện ngày 28 và tính phạt cọc ngày 5 luôn đồng bộ.
                </p>
              </div>

              <div className="p-3 rounded-lg border bg-card space-y-1">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" /> Tiền tệ Chuẩn VNĐ (NFR-12)
                </span>
                <p className="text-sm font-bold text-primary">
                  {formatVND(2500000)} / tháng
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Định dạng dấu chấm phân cách hàng nghìn và ký hiệu ₫ theo quy chuẩn Việt Nam.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: 4 Room Status Cards (FR-04) */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
                <BedDouble className="w-5 h-5 text-primary" />
                <span>4 Trạng thái Phòng Trọ Chuẩn Nghiệp vụ (FR-04)</span>
              </h2>
              <p className="text-xs text-muted-foreground">
                Màu sắc và nhãn trạng thái được thiết kế theo bộ quy chuẩn Impeccable (DESIGN.md).
              </p>
            </div>
            <Link href="/rooms" className="text-xs text-primary font-medium hover:underline hidden sm:inline-flex items-center gap-1">
              Xem tất cả phòng <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {sampleRooms.map((room) => {
              const badgeVariant = getRoomStatusBadgeVariant(room.status);

              return (
                <Card key={room.id} className="relative overflow-hidden transition-all hover:border-primary/40 hover:shadow-sm">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-bold text-foreground">
                        {room.roomNumber}
                      </span>
                      <Badge variant={badgeVariant}>
                        {room.statusText}
                      </Badge>
                    </div>
                    <CardDescription className="text-xs">{room.building}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-1 space-y-2">
                    <div className="text-base font-bold text-primary">
                      {formatVND(room.price)}
                      <span className="text-xs font-normal text-muted-foreground"> /tháng</span>
                    </div>

                    <div className="text-xs text-muted-foreground border-t pt-2 min-h-[32px]">
                      {room.tenantName && (
                        <span>Khách thuê: <strong className="text-foreground">{room.tenantName}</strong></span>
                      )}
                      {room.depositDate && (
                        <span className="text-amber-600 font-medium">{room.depositDate}</span>
                      )}
                      {room.note && (
                        <span className="text-rose-600 font-medium">{room.note}</span>
                      )}
                      {!room.tenantName && !room.depositDate && !room.note && (
                        <span className="text-emerald-600 font-medium">Sẵn sàng nhận khách ngay</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Section 3: 4 Role Portals Quick Access */}
        <Card className="border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" />
              <CardTitle className="text-base sm:text-lg">
                4 Phân Hệ Giao Diện Người Dùng (Route Groups)
              </CardTitle>
            </div>
            <CardDescription>
              Trải nghiệm các luồng giao diện bám sát ma trận phân quyền RBAC và đối tượng người dùng.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Link href="/rooms" className="block group">
                <div className="p-4 rounded-xl border border-border bg-card group-hover:border-primary/50 group-hover:bg-primary/5 transition-all space-y-1.5 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-primary uppercase tracking-wider">
                        Guest
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="font-semibold text-sm text-foreground mt-1">
                      (public)/rooms
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Khách vãng lai xem danh sách phòng trống và đăng ký lịch xem phòng.
                    </p>
                  </div>
                  <span className="text-xs text-primary font-medium group-hover:underline pt-2">
                    Xem giao diện &rarr;
                  </span>
                </div>
              </Link>

              <Link href="/login" className="block group">
                <div className="p-4 rounded-xl border border-border bg-card group-hover:border-primary/50 group-hover:bg-primary/5 transition-all space-y-1.5 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-primary uppercase tracking-wider">
                        Auth
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="font-semibold text-sm text-foreground mt-1">
                      (auth)/login
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Đăng nhập, bảo mật BCrypt cost &ge; 10 và cấp token JWT cho 4 vai trò.
                    </p>
                  </div>
                  <span className="text-xs text-primary font-medium group-hover:underline pt-2">
                    Xem giao diện &rarr;
                  </span>
                </div>
              </Link>

              <Link href="/admin/dashboard" className="block group">
                <div className="p-4 rounded-xl border border-border bg-card group-hover:border-primary/50 group-hover:bg-primary/5 transition-all space-y-1.5 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-primary uppercase tracking-wider">
                        Admin
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="font-semibold text-sm text-foreground mt-1">
                      (admin)/dashboard
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Quản lý dãy, phòng, ghi điện nước Offline với Dexie.js và xem báo cáo.
                    </p>
                  </div>
                  <span className="text-xs text-primary font-medium group-hover:underline pt-2">
                    Xem giao diện &rarr;
                  </span>
                </div>
              </Link>

              <Link href="/portal" className="block group">
                <div className="p-4 rounded-xl border border-border bg-card group-hover:border-primary/50 group-hover:bg-primary/5 transition-all space-y-1.5 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-primary uppercase tracking-wider">
                        Tenant
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="font-semibold text-sm text-foreground mt-1">
                      (tenant)/portal
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Cư dân xem hóa đơn, quét mã VietQR SePay và tạo ticket báo sự cố.
                    </p>
                  </div>
                  <span className="text-xs text-primary font-medium group-hover:underline pt-2">
                    Xem giao diện &rarr;
                  </span>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}

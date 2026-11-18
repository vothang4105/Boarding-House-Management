"use client";

import * as React from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatVND } from "@/lib/formatters";
import { db, type PendingElectricityReading } from "@/lib/offline-db";
import { useLiveQuery } from "dexie-react-hooks";
import {
  TrendingUp,
  BedDouble,
  Receipt,
  Zap,
  PlusCircle,
  Database,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [readingInput, setReadingInput] = React.useState({
    roomId: "p101",
    roomNumber: "P.101",
    month: "2026-11",
    oldIndex: 1250,
    newIndex: 1325,
  });

  const offlineReadings = useLiveQuery(() => db.pendingElectricityReadings.toArray(), []);

  const handleSaveOfflineReading = async (e: React.FormEvent) => {
    e.preventDefault();
    if (readingInput.newIndex < readingInput.oldIndex) {
      alert("Chỉ số mới không được nhỏ hơn chỉ số cũ!");
      return;
    }

    await db.saveReading({
      roomId: readingInput.roomId,
      roomNumber: readingInput.roomNumber,
      month: readingInput.month,
      oldIndex: Number(readingInput.oldIndex),
      newIndex: Number(readingInput.newIndex),
      recordedAt: new Date().toISOString(),
      syncStatus: "pending",
    });

    alert(`Đã lưu ngoại tuyến chỉ số điện phòng ${readingInput.roomNumber} vào Dexie.js!`);
  };

  const handleClearOfflineData = async () => {
    if (confirm("Bạn có chắc chắn muốn xóa dữ liệu điện nước ngoại tuyến đang lưu tạm?")) {
      await db.pendingElectricityReadings.clear();
    }
  };

  return (
    <AppShell title="Bảng điều khiển Quản trị">
      <div className="space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Tổng quan Vận hành Nhà trọ
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Theo dõi doanh thu, tỷ lệ lấp đầy và quản lý điện nước ngoại tuyến
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Về trang kiểm tra
              </Button>
            </Link>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="p-4 pb-2">
              <CardDescription className="text-xs">Doanh thu tháng 11</CardDescription>
              <CardTitle className="text-xl sm:text-2xl text-primary font-bold">
                {formatVND(165000000)}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-[11px] text-emerald-600 flex items-center gap-1 font-medium">
                <TrendingUp className="w-3.5 h-3.5" /> +8.5% so với tháng trước
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4 pb-2">
              <CardDescription className="text-xs">Tỷ lệ lấp đầy</CardDescription>
              <CardTitle className="text-xl sm:text-2xl font-bold">
                92.5%
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-[11px] text-muted-foreground">
                59 / 64 phòng đang thuê
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4 pb-2">
              <CardDescription className="text-xs">Phòng còn trống</CardDescription>
              <CardTitle className="text-xl sm:text-2xl font-bold text-emerald-600">
                5 phòng
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-[11px] text-muted-foreground">
                3 phòng sẵn sàng đón khách
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4 pb-2">
              <CardDescription className="text-xs">Hóa đơn chờ thu</CardDescription>
              <CardTitle className="text-xl sm:text-2xl font-bold text-amber-600">
                12 hóa đơn
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-[11px] text-rose-600 font-medium">
                2 hóa đơn quá hạn (&gt; 5 ngày)
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Offline Dexie.js Demonstration */}
        <Card className="border-primary/20 shadow-sm">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                <CardTitle className="text-base sm:text-lg">
                  Ghi chỉ số điện Offline (Dexie.js IndexedDB)
                </CardTitle>
              </div>
              <Badge variant="outline" className="gap-1 border-amber-300 bg-amber-50 text-amber-700 w-fit">
                <Database className="w-3 h-3" />
                {offlineReadings?.length || 0} bản ghi chờ đồng bộ
              </Badge>
            </div>
            <CardDescription>
              Cho phép Quản lý ghi số điện trực tiếp tại từng phòng ngay cả khi mất sóng WiFi / 4G (NFR-09, FR-18).
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleSaveOfflineReading} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium">Số phòng</label>
                <Input
                  value={readingInput.roomNumber}
                  onChange={(e) => setReadingInput({ ...readingInput, roomNumber: e.target.value })}
                  placeholder="P.101"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium">Chỉ số cũ (kWh)</label>
                <Input
                  type="number"
                  value={readingInput.oldIndex}
                  onChange={(e) => setReadingInput({ ...readingInput, oldIndex: Number(e.target.value) })}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium">Chỉ số mới (kWh)</label>
                <Input
                  type="number"
                  value={readingInput.newIndex}
                  onChange={(e) => setReadingInput({ ...readingInput, newIndex: Number(e.target.value) })}
                  required
                />
              </div>

              <div className="flex items-end">
                <Button type="submit" className="w-full gap-2 min-h-[44px]">
                  <PlusCircle className="w-4 h-4" /> Lưu Offline
                </Button>
              </div>
            </form>

            {/* List of Offline Stored Readings */}
            <div className="rounded-lg border bg-muted/30 p-3 space-y-2">
              <div className="flex items-center justify-between text-xs font-medium text-foreground">
                <span>Dữ liệu đã ghi trong trình duyệt (IndexedDB):</span>
                {offlineReadings && offlineReadings.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearOfflineData}
                    className="text-destructive hover:underline text-[11px]"
                  >
                    Xóa tất cả
                  </button>
                )}
              </div>

              {offlineReadings && offlineReadings.length > 0 ? (
                <div className="divide-y divide-border">
                  {offlineReadings.map((reading: PendingElectricityReading) => (
                    <div key={reading.id} className="py-2 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-foreground">{reading.roomNumber}</span>
                        <span className="text-muted-foreground ml-2">
                          Tháng {reading.month}: {reading.oldIndex} &rarr; {reading.newIndex} kWh (
                          <span className="font-semibold text-primary">{reading.newIndex - reading.oldIndex} kWh</span>)
                        </span>
                      </div>
                      <Badge variant="outline" className="text-[10px] bg-background">
                        Chờ đồng bộ
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground italic py-1">
                  Chưa có chỉ số điện nào được lưu offline. Hãy nhập thử một bản ghi ở trên!
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}

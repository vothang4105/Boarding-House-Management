"use client";

import * as React from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatVND } from "@/lib/formatters";
import {
  QrCode,
  FileText,
  Wrench,
  BedDouble,
  Receipt,
  ArrowLeft,
  Calendar,
  AlertCircle,
} from "lucide-react";

export default function TenantPortalPage() {
  return (
    <AppShell title="Cổng thông tin Cư dân">
      <div className="space-y-6">
        {/* Top greeting */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Xin chào, Nguyễn Văn A!
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Khách thuê phòng <span className="font-semibold text-primary">P.203</span> - Dãy A Nhà trọ Lan Anh
            </p>
          </div>
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Về trang kiểm tra
            </Button>
          </Link>
        </div>

        {/* Current Month Invoice Banner */}
        <Card className="border-amber-300 bg-amber-50/30 dark:bg-amber-950/20 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-amber-600" />
                <CardTitle className="text-lg">Hóa đơn tiền phòng tháng 11/2026</CardTitle>
              </div>
              <Badge variant="warning">Chờ thanh toán</Badge>
            </div>
            <CardDescription>
              Hạn thanh toán: 05/12/2026 (Quá hạn sau 5 ngày sẽ khóa tài khoản theo quy định BR-08)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-baseline justify-between border-b pb-2">
              <span className="text-sm text-muted-foreground">Tổng tiền cần thanh toán:</span>
              <span className="text-2xl font-black text-primary">
                {formatVND(3250000)}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-muted-foreground pt-1">
              <div>Tiền phòng: <strong className="text-foreground">{formatVND(2500000)}</strong></div>
              <div>Điền (75 kWh): <strong className="text-foreground">{formatVND(262500)}</strong></div>
              <div>Nước sinh hoạt: <strong className="text-foreground">{formatVND(100000)}</strong></div>
              <div>Rác &amp; WiFi: <strong className="text-foreground">{formatVND(387500)}</strong></div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-2">
            <Button className="w-full sm:w-auto gap-2 min-h-[44px]">
              <QrCode className="w-4 h-4" /> Quét mã SePay VietQR (Tự động gạch nợ)
            </Button>
            <Button variant="outline" className="w-full sm:w-auto gap-2 min-h-[44px]">
              <FileText className="w-4 h-4" /> Xem chi tiết hóa đơn
            </Button>
          </CardFooter>
        </Card>

        {/* Quick Resident Services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <BedDouble className="w-5 h-5 text-primary" />
                <CardTitle className="text-base">Hợp đồng thuê phòng</CardTitle>
              </div>
              <CardDescription>Mã hợp đồng: HĐ-2026-089</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Thời hạn hợp đồng:</span>
                <span className="font-medium text-foreground">01/01/2026 - 31/12/2026</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tiền cọc giữ chỗ:</span>
                <span className="font-medium text-foreground">{formatVND(2500000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Quy định hoàn cọc:</span>
                <span className="text-muted-foreground">Báo trước 30 ngày (BR-11)</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-primary" />
                <CardTitle className="text-base">Gửi yêu cầu Sự cố (Ticket)</CardTitle>
              </div>
              <CardDescription>Báo hỏng bóng đèn, vòi nước, điều hòa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-muted-foreground">
                Gửi hình ảnh và mô tả để quản lý sắp xếp thợ kỹ thuật sửa chữa kịp thời.
              </p>
              <Button variant="secondary" className="w-full gap-2 min-h-[44px]">
                <Wrench className="w-4 h-4" /> Tạo phiếu báo hỏng mới
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

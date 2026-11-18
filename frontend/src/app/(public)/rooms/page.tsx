import * as React from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatVND } from "@/lib/formatters";
import { BedDouble, ArrowLeft, PhoneCall } from "lucide-react";

const samplePublicRooms = [
  {
    id: "r101",
    roomNumber: "P.101",
    buildingName: "Dãy A - Khu Nhà Trọ Lan Anh",
    price: 2500000,
    area: 22,
    amenities: ["Máy lạnh", "Gác lửng", "Tủ lạnh mini", "WC riêng"],
    status: "Trống",
  },
  {
    id: "r102",
    roomNumber: "P.102",
    buildingName: "Dãy A - Khu Nhà Trọ Lan Anh",
    price: 2800000,
    area: 25,
    amenities: ["Máy lạnh", "Ban công thoáng", "Máy nước nóng", "WC riêng"],
    status: "Trống",
  },
];

export default function PublicRoomsPage() {
  return (
    <AppShell title="Danh sách phòng trống">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Phòng đang trống sẵn sàng đón khách
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Xem chi tiết phòng trọ và liên hệ đặt lịch xem trực tiếp
            </p>
          </div>
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Về trang kiểm tra
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {samplePublicRooms.map((room) => (
            <Card key={room.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BedDouble className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">{room.roomNumber}</CardTitle>
                  </div>
                  <Badge variant="success">Sẵn sàng thuê</Badge>
                </div>
                <CardDescription>{room.buildingName}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-baseline justify-between border-b pb-2">
                  <span className="text-sm text-muted-foreground">Giá thuê tháng:</span>
                  <span className="text-lg font-bold text-primary">
                    {formatVND(room.price)}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Diện tích: <span className="font-medium text-foreground">{room.area}m²</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {room.amenities.map((item) => (
                    <span
                      key={item}
                      className="inline-block px-2 py-0.5 text-[11px] bg-muted rounded-md text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <Button className="w-full mt-3 gap-2 min-h-[44px]">
                  <PhoneCall className="w-4 h-4" /> Liên hệ đặt lịch xem phòng
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

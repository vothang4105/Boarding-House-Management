"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogIn, ArrowLeft, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const [identifier, setIdentifier] = React.useState("chilan@mbhms.vn");
  const [password, setPassword] = React.useState("Admin@123456");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Đăng nhập với tài khoản: ${identifier}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground font-black text-2xl shadow-sm">
            M
          </div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Hệ thống Quản lý Nhà trọ
          </h1>
          <p className="text-xs text-muted-foreground">
            Đăng nhập để quản lý phòng, điện nước và hóa đơn
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Đăng nhập tài khoản</CardTitle>
            <CardDescription>
              Nhập số điện thoại hoặc email đã được chủ trọ cấp quyền
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">
                  Số điện thoại / Email
                </label>
                <Input
                  type="text"
                  placeholder="0912345678 hoặc email"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-foreground">
                    Mật khẩu
                  </label>
                  <a
                    href="#forgot"
                    className="text-xs text-primary hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Vui lòng liên hệ Chủ trọ hoặc dùng tính năng Quên mật khẩu qua email ở Sprint 1.");
                    }}
                  >
                    Quên mật khẩu?
                  </a>
                </div>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="rounded-lg bg-muted/60 p-3 text-xs text-muted-foreground space-y-1">
                <div className="font-semibold text-foreground flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                  Mật khẩu bảo mật BCrypt (NFR-04)
                </div>
                <div>Chi phí mã hóa cost &ge; 10, phân quyền chuẩn RBAC 4 vai trò.</div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-2">
              <Button type="submit" className="w-full gap-2 min-h-[44px]">
                <LogIn className="w-4 h-4" /> Đăng nhập hệ thống
              </Button>
              <Link href="/" className="w-full">
                <Button variant="ghost" size="sm" type="button" className="w-full gap-1.5">
                  <ArrowLeft className="w-3.5 h-3.5" /> Về trang kiểm tra
                </Button>
              </Link>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}

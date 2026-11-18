import { RoomStatus, InvoiceStatus } from "@/types/domain";

/**
 * NFR-12: Định dạng tiền VNĐ có ký hiệu ₫ chuẩn Việt Nam
 * Ví dụ: 2500000 -> "2.500.000₫"
 */
export function formatVND(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return "0₫";
  }
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace(/\s?₫|VND/, "")
    .trim() + "₫";
}

/**
 * NFR-13: Định dạng ngày theo chuẩn Việt Nam dd/MM/yyyy
 * Cố định múi giờ Asia/Ho_Chi_Minh
 */
export function formatDateVN(date: string | Date): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "";

  return new Intl.DateTimeFormat("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(d);
}

/**
 * NFR-13: Định dạng ngày giờ HH:mm dd/MM/yyyy theo múi giờ Việt Nam
 */
export function formatDateTimeVN(date: string | Date): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "";

  return new Intl.DateTimeFormat("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour12: false,
  }).format(d);
}

/**
 * FR-04: Nhãn trạng thái phòng bằng tiếng Việt
 */
export function getRoomStatusLabel(status: RoomStatus): string {
  switch (status) {
    case RoomStatus.Available:
      return "Phòng trống";
    case RoomStatus.Rented:
      return "Đang thuê";
    case RoomStatus.Reserved:
      return "Đã đặt cọc";
    case RoomStatus.Maintenance:
      return "Đang sửa chữa";
    default:
      return "Không xác định";
  }
}

/**
 * Màu sắc trạng thái phòng theo chuẩn thiết kế PRODUCT.md / DESIGN.md
 */
export function getRoomStatusBadgeClass(status: RoomStatus): string {
  switch (status) {
    case RoomStatus.Available:
      return "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800";
    case RoomStatus.Rented:
      return "bg-blue-50 text-blue-700 border-blue-300 dark:bg-blue-950/50 dark:text-blue-400 dark:border-blue-800";
    case RoomStatus.Reserved:
      return "bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800";
    case RoomStatus.Maintenance:
      return "bg-rose-50 text-rose-700 border-rose-300 dark:bg-rose-950/50 dark:text-rose-400 dark:border-rose-800";
    default:
      return "bg-slate-50 text-slate-700 border-slate-300 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800";
  }
}

/**
 * FR-27: Nhãn trạng thái hóa đơn bằng tiếng Việt
 */
export function getInvoiceStatusLabel(status: InvoiceStatus): string {
  switch (status) {
    case InvoiceStatus.Pending:
      return "Chờ thanh toán";
    case InvoiceStatus.Paid:
      return "Đã thanh toán";
    case InvoiceStatus.Overdue:
      return "Quá hạn";
    case InvoiceStatus.Cancelled:
      return "Đã hủy";
    default:
      return "Không xác định";
  }
}

/**
 * Trả về badge variant chuẩn cho shadcn/ui Badge
 */
export function getRoomStatusBadgeVariant(
  status: RoomStatus
): "default" | "secondary" | "destructive" | "outline" | "success" | "info" | "warning" {
  switch (status) {
    case RoomStatus.Available:
      return "success";
    case RoomStatus.Rented:
      return "info";
    case RoomStatus.Reserved:
      return "warning";
    case RoomStatus.Maintenance:
      return "destructive";
    default:
      return "default";
  }
}


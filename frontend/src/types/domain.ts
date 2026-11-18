export enum UserRole {
  Owner = 1,
  Manager = 2,
  Tenant = 3,
  Guest = 4,
}

export enum RoomType {
  Single = 1,
  Double = 2,
  Family = 3,
}

export enum RoomStatus {
  Available = 1,
  Rented = 2,
  Maintenance = 3,
  Reserved = 4,
}

export enum InvoiceStatus {
  Pending = 1,
  Paid = 2,
  Overdue = 3,
  Cancelled = 4,
}

export enum TicketStatus {
  Open = 1,
  Processing = 2,
  Resolved = 3,
  Closed = 4,
}

export enum TicketPriority {
  Low = 1,
  Medium = 2,
  High = 3,
  Urgent = 4,
}

export enum PaymentMethod {
  SePayVietQR = 1,
  Cash = 2,
}

export interface RoomCardViewModel {
  id: string;
  roomNumber: string;
  buildingName: string;
  roomType: RoomType;
  basePrice: number;
  status: RoomStatus;
  maxTenants: number;
  currentTenantsCount?: number;
}

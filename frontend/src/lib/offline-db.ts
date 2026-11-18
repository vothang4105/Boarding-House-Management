import Dexie, { type Table } from "dexie";

/**
 * FR-18, NFR-09: Cấu trúc bản ghi chỉ số điện ngoại tuyến
 * Lưu trữ tại IndexedDB cục bộ của thiết bị Quản lý dãy
 */
export interface PendingElectricityReading {
  id?: number;
  roomId: string;
  roomNumber: string;
  month: string; // Định dạng YYYY-MM (ví dụ: "2026-11")
  oldIndex: number;
  newIndex: number;
  consumptionKWh: number;
  photoBlob?: Blob; // Ảnh chụp đồng hồ điện lưu tạm
  recordedAt: string; // ISO string theo múi giờ UTC+7
  syncStatus: "PENDING" | "SYNCED" | "FAILED";
  errorMessage?: string;
}

export class MbhmsOfflineDb extends Dexie {
  pendingElectricityReadings!: Table<PendingElectricityReading, number>;

  constructor() {
    super("MbhmsOfflineDb");
    this.version(1).stores({
      pendingElectricityReadings: "++id, roomId, month, syncStatus, recordedAt",
    });
  }

  async saveReading(data: {
    roomId: string;
    roomNumber: string;
    month: string;
    oldIndex: number;
    newIndex: number;
    recordedAt: string;
    syncStatus?: "PENDING" | "SYNCED" | "FAILED" | string;
  }): Promise<number> {
    return await this.pendingElectricityReadings.add({
      roomId: data.roomId,
      roomNumber: data.roomNumber,
      month: data.month,
      oldIndex: data.oldIndex,
      newIndex: data.newIndex,
      consumptionKWh: data.newIndex - data.oldIndex,
      recordedAt: data.recordedAt,
      syncStatus: "PENDING",
    });
  }
}

export const offlineDb = new MbhmsOfflineDb();
export const db = offlineDb;

/**
 * Lưu chỉ số điện vào IndexedDB khi không có mạng
 */
export async function savePendingReading(
  reading: Omit<PendingElectricityReading, "id">
): Promise<number> {
  return await offlineDb.pendingElectricityReadings.add({
    ...reading,
    syncStatus: "PENDING",
  });
}

/**
 * Lấy danh sách các chỉ số điện chưa được đồng bộ
 */
export async function getPendingReadings(): Promise<PendingElectricityReading[]> {
  return await offlineDb.pendingElectricityReadings
    .where("syncStatus")
    .equals("PENDING")
    .toArray();
}

/**
 * Đánh dấu bản ghi đã đồng bộ thành công lên server
 */
export async function markReadingSynced(id: number): Promise<void> {
  await offlineDb.pendingElectricityReadings.update(id, {
    syncStatus: "SYNCED",
  });
}

/**
 * Xóa các bản ghi đã đồng bộ hoàn tất
 */
export async function clearSyncedReadings(): Promise<void> {
  await offlineDb.pendingElectricityReadings
    .where("syncStatus")
    .equals("SYNCED")
    .delete();
}

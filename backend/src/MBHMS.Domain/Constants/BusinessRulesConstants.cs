namespace MBHMS.Domain.Constants;

public static class BusinessRulesConstants
{
    // BR-01: Đơn giá điện sinh hoạt (VNĐ / kWh)
    public const decimal ElectricityUnitPrice = 3500m;

    // BR-02: Đơn giá nước sinh hoạt (VNĐ / người / tháng)
    public const decimal WaterUnitPricePerPerson = 100000m;

    // BR-03: Đơn giá dịch vụ Internet/Wifi (VNĐ / phòng / tháng)
    public const decimal InternetUnitPricePerRoom = 100000m;

    // BR-04: Đơn giá rác & vệ sinh môi trường (VNĐ / phòng / tháng)
    public const decimal WasteUnitPricePerRoom = 50000m;

    // BR-05: Đơn giá giữ xe máy (VNĐ / xe / tháng)
    public const decimal ParkingUnitPricePerVehicle = 120000m;

    // BR-06: Sức chứa tối đa theo từng loại phòng
    public const int SingleRoomCapacity = 1;
    public const int DoubleRoomCapacity = 2;
    public const int FamilyRoomCapacity = 4;

    // BR-07: Ngày chốt và tự động sinh hóa đơn hàng tháng (Ngày 28)
    public const int InvoiceGenerationDay = 28;

    // BR-08: Hạn chót thanh toán hóa đơn (Ngày 05 của tháng kế tiếp)
    public const int InvoicePaymentDueDay = 5;

    // BR-09: Hệ số tiền đặt cọc (Bằng 1 tháng tiền phòng cơ bản)
    public const decimal DepositMonthsMultiplier = 1.0m;

    // BR-11: Số ngày báo trước tối thiểu khi chấm dứt hợp đồng để được nhận đủ 100% cọc
    public const int MinimumTerminationNoticeDays = 30;

    // BR-11: Tỷ lệ phạt trừ tiền cọc khi báo trước dưới 30 ngày (50%)
    public const decimal TerminationPenaltyRate = 0.50m;

    // BR-13: Độ dài chuẩn của Căn cước công dân (12 chữ số)
    public const int CitizenIdLength = 12;

    // NFR-04: Bcrypt Work Factor (cost >= 10)
    public const int BcryptWorkFactor = 11;
}

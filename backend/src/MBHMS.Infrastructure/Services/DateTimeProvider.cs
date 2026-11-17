using MBHMS.Domain.Common;

namespace MBHMS.Infrastructure.Services;

public class DateTimeProvider : IDateTimeProvider
{
    private static readonly TimeZoneInfo VietnamTimeZone = ResolveVietnamTimeZone();

    public DateTime Now => TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, VietnamTimeZone);
    public DateTime UtcNow => DateTime.UtcNow;
    public DateTimeOffset NowOffset => TimeZoneInfo.ConvertTime(DateTimeOffset.UtcNow, VietnamTimeZone);
    public DateOnly Today => DateOnly.FromDateTime(Now);

    private static TimeZoneInfo ResolveVietnamTimeZone()
    {
        try
        {
            // Hỗ trợ môi trường Linux, macOS, Docker container và hosting Render/Railway
            return TimeZoneInfo.FindSystemTimeZoneById("Asia/Ho_Chi_Minh");
        }
        catch (TimeZoneNotFoundException)
        {
            try
            {
                // Fallback hỗ trợ môi trường Windows máy cục bộ
                return TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time");
            }
            catch (TimeZoneNotFoundException)
            {
                // Fallback cố định múi giờ UTC+7 nếu không tìm thấy identifier
                return TimeZoneInfo.CreateCustomTimeZone(
                    "ICT",
                    TimeSpan.FromHours(7),
                    "Indochina Time (UTC+7)",
                    "Indochina Time");
            }
        }
    }
}

namespace MBHMS.Domain.Common;

public interface IDateTimeProvider
{
    DateTime Now { get; }
    DateTime UtcNow { get; }
    DateTimeOffset NowOffset { get; }
    DateOnly Today { get; }
}

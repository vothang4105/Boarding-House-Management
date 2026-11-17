using MBHMS.Infrastructure.Services;
using Xunit;

namespace MBHMS.UnitTests.Common;

public class DateTimeProviderTests
{
    [Fact]
    public void DateTimeProvider_ShouldReturnOffsetOfPlusSevenHours()
    {
        // Arrange
        var provider = new DateTimeProvider();

        // Act
        var nowOffset = provider.NowOffset;

        // Assert
        Assert.Equal(TimeSpan.FromHours(7), nowOffset.Offset);
    }

    [Fact]
    public void DateTimeProvider_Now_ShouldBeAheadOfUtcNowBySevenHours()
    {
        // Arrange
        var provider = new DateTimeProvider();

        // Act
        var now = provider.Now;
        var utcNow = provider.UtcNow;
        var diff = now - utcNow;

        // Assert (cho phép dung sai nhỏ do thời gian thực thi lệnh)
        Assert.InRange(diff.TotalHours, 6.99, 7.01);
    }

    [Fact]
    public void DateTimeProvider_Today_ShouldMatchNowDate()
    {
        // Arrange
        var provider = new DateTimeProvider();

        // Act
        var today = provider.Today;
        var nowDateOnly = DateOnly.FromDateTime(provider.Now);

        // Assert
        Assert.Equal(nowDateOnly, today);
    }
}

using MBHMS.Domain.Constants;
using Xunit;

namespace MBHMS.UnitTests.Domain;

public class BusinessRulesConstantsTests
{
    [Fact]
    public void BR01_ElectricityCost_ShouldCalculateCorrectly()
    {
        // Arrange
        const decimal consumptionKWh = 120m;
        const decimal expectedCost = 120m * 3500m; // 420,000 VNĐ

        // Act
        var actualCost = consumptionKWh * BusinessRulesConstants.ElectricityUnitPrice;

        // Assert
        Assert.Equal(3500m, BusinessRulesConstants.ElectricityUnitPrice);
        Assert.Equal(expectedCost, actualCost);
    }

    [Fact]
    public void BR02_WaterCost_ShouldCalculatePerPersonCorrectly()
    {
        // Arrange
        const int numberOfTenants = 3;
        const decimal expectedCost = 3 * 100000m; // 300,000 VNĐ

        // Act
        var actualCost = numberOfTenants * BusinessRulesConstants.WaterUnitPricePerPerson;

        // Assert
        Assert.Equal(100000m, BusinessRulesConstants.WaterUnitPricePerPerson);
        Assert.Equal(expectedCost, actualCost);
    }

    [Fact]
    public void BR06_RoomCapacities_ShouldMatchSpecifications()
    {
        Assert.Equal(1, BusinessRulesConstants.SingleRoomCapacity);
        Assert.Equal(2, BusinessRulesConstants.DoubleRoomCapacity);
        Assert.Equal(4, BusinessRulesConstants.FamilyRoomCapacity);
    }

    [Fact]
    public void BR07_And_BR08_BillingCycleDays_ShouldMatchRules()
    {
        Assert.Equal(28, BusinessRulesConstants.InvoiceGenerationDay);
        Assert.Equal(5, BusinessRulesConstants.InvoicePaymentDueDay);
    }

    [Theory]
    [InlineData(30, 3000000, 3000000, 0)]      // Báo trước đủ 30 ngày: hoàn 100%, phạt 0
    [InlineData(35, 3000000, 3000000, 0)]      // Báo trước > 30 ngày: hoàn 100%, phạt 0
    [InlineData(15, 3000000, 1500000, 1500000)]  // Báo trước 15 ngày (< 30): phạt 50%, hoàn 50%
    [InlineData(0, 4000000, 2000000, 2000000)]   // Báo ngay lập tức: phạt 50%, hoàn 50%
    public void BR11_EarlyTermination_ShouldApplyPenaltyWhenNoticeLessThanThirtyDays(
        int noticeDays,
        decimal depositAmount,
        decimal expectedRefund,
        decimal expectedPenalty)
    {
        // Act
        decimal penaltyAmount;
        decimal refundAmount;

        if (noticeDays >= BusinessRulesConstants.MinimumTerminationNoticeDays)
        {
            penaltyAmount = 0m;
            refundAmount = depositAmount;
        }
        else
        {
            penaltyAmount = depositAmount * BusinessRulesConstants.TerminationPenaltyRate;
            refundAmount = depositAmount - penaltyAmount;
        }

        // Assert
        Assert.Equal(expectedPenalty, penaltyAmount);
        Assert.Equal(expectedRefund, refundAmount);
    }

    [Fact]
    public void NFR04_BcryptWorkFactor_ShouldBeAtLeastTen()
    {
        Assert.True(BusinessRulesConstants.BcryptWorkFactor >= 10);
    }

    [Fact]
    public void BR13_CitizenIdLength_ShouldBeTwelve()
    {
        Assert.Equal(12, BusinessRulesConstants.CitizenIdLength);
    }
}

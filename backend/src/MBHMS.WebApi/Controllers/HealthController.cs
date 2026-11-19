using MBHMS.Application.Common.Models;
using MBHMS.Domain.Common;
using MBHMS.Infrastructure.Persistence;
using Microsoft.AspNetCore.Mvc;

namespace MBHMS.WebApi.Controllers;

public class HealthController : BaseApiController
{
    private readonly IDateTimeProvider _dateTimeProvider;
    private readonly AppDbContext _dbContext;

    public HealthController(IDateTimeProvider dateTimeProvider, AppDbContext dbContext)
    {
        _dateTimeProvider = dateTimeProvider;
        _dbContext = dbContext;
    }

    [HttpGet]
    [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status200OK)]
    public async Task<IActionResult> CheckHealth()
    {
        bool dbConnected = false;
        try
        {
            dbConnected = await _dbContext.Database.CanConnectAsync();
        }
        catch
        {
            dbConnected = false;
        }

        var healthData = new
        {
            status = dbConnected ? "Healthy" : "Degraded",
            database = dbConnected ? "Connected" : "Disconnected",
            service = "MBHMS.WebApi",
            version = "1.0.0",
            timeZone = "Asia/Ho_Chi_Minh (UTC+7)",
            serverTime = _dateTimeProvider.NowOffset.ToString("o")
        };

        var message = dbConnected
            ? "Hệ thống MBHMS Backend và Database đang hoạt động ổn định."
            : "Hệ thống MBHMS Backend đang hoạt động, chưa kết nối được Database.";

        return Ok(ApiResponse<object>.SuccessResult(healthData, message));
    }
}

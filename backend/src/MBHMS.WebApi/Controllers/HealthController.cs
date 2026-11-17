using MBHMS.Application.Common.Models;
using MBHMS.Domain.Common;
using Microsoft.AspNetCore.Mvc;

namespace MBHMS.WebApi.Controllers;

public class HealthController : BaseApiController
{
    private readonly IDateTimeProvider _dateTimeProvider;

    public HealthController(IDateTimeProvider dateTimeProvider)
    {
        _dateTimeProvider = dateTimeProvider;
    }

    [HttpGet]
    [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status200OK)]
    public IActionResult CheckHealth()
    {
        var healthData = new
        {
            status = "Healthy",
            service = "MBHMS.WebApi",
            version = "1.0.0",
            timeZone = "Asia/Ho_Chi_Minh (UTC+7)",
            serverTime = _dateTimeProvider.NowOffset.ToString("o")
        };

        return Ok(ApiResponse<object>.SuccessResult(healthData, "Hệ thống MBHMS Backend đang hoạt động ổn định."));
    }
}

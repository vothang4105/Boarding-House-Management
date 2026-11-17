namespace MBHMS.Application.Common.Interfaces;

public interface ISePayService
{
    string GenerateVietQrUrl(decimal amount, string description, string? bankCode = null, string? accountNumber = null);
    bool VerifyWebhookSignature(string payload, string signature);
}

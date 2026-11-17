namespace MBHMS.Application.Common.Interfaces;

public interface IEmailService
{
    Task SendEmailAsync(string to, string subject, string body, bool isHtml = true, CancellationToken cancellationToken = default);
    Task SendEmailWithAttachmentAsync(string to, string subject, string body, byte[] attachmentBytes, string attachmentFileName, CancellationToken cancellationToken = default);
}

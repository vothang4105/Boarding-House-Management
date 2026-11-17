namespace MBHMS.Application.Common.Interfaces;

public interface IStorageService
{
    Task<string> UploadPublicFileAsync(string bucketName, string fileName, Stream content, string contentType, CancellationToken cancellationToken = default);
    Task<string> UploadPrivateFileAsync(string bucketName, string fileName, Stream content, string contentType, CancellationToken cancellationToken = default);
    Task<string> GetSignedUrlAsync(string bucketName, string fileName, int expirySeconds = 3600, CancellationToken cancellationToken = default);
    Task DeleteFileAsync(string bucketName, string fileName, CancellationToken cancellationToken = default);
}

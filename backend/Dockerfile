# Stage 1: Build & Publish
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Sao chép các tệp project để tối ưu hóa Docker layer caching khi restore
COPY ["src/MBHMS.Domain/MBHMS.Domain.csproj", "src/MBHMS.Domain/"]
COPY ["src/MBHMS.Application/MBHMS.Application.csproj", "src/MBHMS.Application/"]
COPY ["src/MBHMS.Infrastructure/MBHMS.Infrastructure.csproj", "src/MBHMS.Infrastructure/"]
COPY ["src/MBHMS.WebApi/MBHMS.WebApi.csproj", "src/MBHMS.WebApi/"]
COPY ["tests/MBHMS.UnitTests/MBHMS.UnitTests.csproj", "tests/MBHMS.UnitTests/"]
COPY ["MBHMS.sln", "./"]

# Restore toàn bộ dependencies
RUN dotnet restore "MBHMS.sln"

# Sao chép toàn bộ mã nguồn backend
COPY . .

# Biên dịch và phát hành bản Release cho MBHMS.WebApi
RUN dotnet publish "src/MBHMS.WebApi/MBHMS.WebApi.csproj" \
    -c Release \
    -o /app/publish \
    --no-restore

# Stage 2: Runtime tối giản
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app

# Cài đặt tzdata và khóa cứng múi giờ Việt Nam Asia/Ho_Chi_Minh (NFR-13)
RUN apt-get update && apt-get install -y --no-install-recommends tzdata \
    && rm -rf /var/lib/apt/lists/*

ENV TZ=Asia/Ho_Chi_Minh
ENV ASPNETCORE_URLS=http://+:8080
ENV DOTNET_RUNNING_IN_CONTAINER=true

# Sao chép binary artifacts từ Build Stage
COPY --from=build /app/publish .

# Mở cổng dịch vụ API
EXPOSE 8080

ENTRYPOINT ["dotnet", "MBHMS.WebApi.dll"]

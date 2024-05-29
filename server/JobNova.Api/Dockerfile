FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["JobNova_server/JobNova_server.csproj", "JobNova_server/"]
RUN dotnet restore "JobNova_server/JobNova_server.csproj"
COPY . .
WORKDIR "/src/JobNova_server"
RUN dotnet build "JobNova_server.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "JobNova_server.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "JobNova_server.dll"]

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

WORKDIR /src

COPY . .

RUN dotnet restore Fundo.Applications.WebApi.csproj

RUN dotnet publish Fundo.Applications.WebApi.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:6.0

WORKDIR /app

COPY --from=build /app/publish .

EXPOSE 80

ENTRYPOINT ["dotnet", "Fundo.Applications.WebApi.dll"]
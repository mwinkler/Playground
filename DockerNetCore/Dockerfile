FROM microsoft/dotnet:latest

EXPOSE 5001

ADD ./bin/Debug/netcoreapp1.0/publish /app

WORKDIR /app

CMD ["dotnet", "DockerNetCore.dll"]
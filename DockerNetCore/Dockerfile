FROM microsoft/dotnet:latest

EXPOSE 5001

ADD ./dist /app

WORKDIR /app

CMD ["dotnet", "DockerNetCore.dll"]
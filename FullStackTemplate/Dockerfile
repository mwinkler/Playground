FROM microsoft/aspnetcore

EXPOSE 80

ADD ./build /build

#WORKDIR /app/server

ENTRYPOINT ["dotnet", "build/server/server.dll"]
FROM microsoft/aspnetcore

EXPOSE 80

ADD ./build /build

WORKDIR /build/Frontend

ENTRYPOINT ["dotnet", "Frontend.dll"]
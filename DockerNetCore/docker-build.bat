@echo off

rmdir bin\Debug\netcoreapp1.0\publish /s /q

dotnet publish

docker rmi mwinkler/demowebapp

docker build -t mwinkler/demowebapp ./
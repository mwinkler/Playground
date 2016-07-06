@echo off

rmdir dist /s /q

dotnet publish -o dist

docker rmi mwinkler/demowebapp

docker build -t mwinkler/demowebapp ./
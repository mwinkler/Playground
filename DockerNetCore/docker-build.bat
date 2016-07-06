@echo off

rmdir dist /s /q

dotnet publish -o dist

docker build -t demowebapp ./
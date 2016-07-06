@echo off

rmdir dist /s /q

dotnet publish -o dist

docker rmi demowebapp

docker build -t demowebapp ./
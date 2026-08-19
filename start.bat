@echo off
REM Three Kingdoms Platform - Start Script (Windows Batch)
REM Run both API and Web servers in separate terminals

echo Starting Three Kingdoms Platform...
echo.

REM Start API server in new window
start "API Server" cmd /k "cd /d %~dp0apps\api && echo Starting API Server on port 4001... && node --import tsx src/server.ts"

REM Wait for API to start
timeout /t 3 /nobreak > nul

REM Start Web server in new window
start "Web Server" cmd /k "cd /d %~dp0apps\web && echo Starting Web Server... && npx vite"

echo.
echo Servers starting in new windows!
echo.
echo   API:  http://localhost:4001/graphql
echo   Web:  http://localhost:5173
echo.

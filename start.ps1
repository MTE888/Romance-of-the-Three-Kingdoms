# Three Kingdoms Platform - Start Script (PowerShell)
# Run both API and Web servers in separate terminals

Write-Host "Starting Three Kingdoms Platform..." -ForegroundColor Cyan

# Start API server in new terminal
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\apps\api'; Write-Host 'Starting API Server on port 4001...' -ForegroundColor Green; node --import tsx src/server.ts"

# Wait a moment for API to start
Start-Sleep -Seconds 3

# Start Web server in new terminal
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\apps\web'; Write-Host 'Starting Web Server...' -ForegroundColor Green; npx vite"

Write-Host ""
Write-Host "Servers starting in new terminals!" -ForegroundColor Green
Write-Host ""
Write-Host "  API:  http://localhost:4001/graphql" -ForegroundColor Yellow
Write-Host "  Web:  http://localhost:5173" -ForegroundColor Yellow
Write-Host ""

@echo off
REM Suno Labs Website - Local Server Starter for Windows
REM Script untuk menjalankan website di local server

echo 🚀 Starting Suno Labs Website...
echo ==================================

REM Check if Python is available
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Python found
    echo 🌐 Starting local server on http://localhost:8000
    echo 📁 Opening run.html in browser...
    echo.
    echo Press Ctrl+C to stop the server
    echo ==================================
    
    REM Open browser and start server
    start http://localhost:8000/run.html
    python -m http.server 8000
) else (
    echo ❌ Python not found
    echo Please install Python or use a different method to run the website
    echo.
    echo Alternative methods:
    echo 1. Open index.html directly in your browser
    echo 2. Use Node.js: npx live-server
    echo 3. Use PHP: php -S localhost:8000
    pause
    exit /b 1
)
#!/bin/bash

# Suno Labs Website - Local Server Starter
# Script untuk menjalankan website di local server

echo "🚀 Starting Suno Labs Website..."
echo "=================================="

# Check if Python is available
if command -v python3 &> /dev/null; then
    echo "✅ Python3 found"
    echo "🌐 Starting local server on http://localhost:8000"
    echo "📁 Opening run.html in browser..."
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo "=================================="
    
    # Open browser and start server
    if command -v xdg-open &> /dev/null; then
        xdg-open http://localhost:8000/run.html &
    elif command -v open &> /dev/null; then
        open http://localhost:8000/run.html &
    fi
    
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "✅ Python found"
    echo "🌐 Starting local server on http://localhost:8000"
    echo "📁 Opening run.html in browser..."
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo "=================================="
    
    # Open browser and start server
    if command -v xdg-open &> /dev/null; then
        xdg-open http://localhost:8000/run.html &
    elif command -v open &> /dev/null; then
        open http://localhost:8000/run.html &
    fi
    
    python -m http.server 8000
else
    echo "❌ Python not found"
    echo "Please install Python or use a different method to run the website"
    echo ""
    echo "Alternative methods:"
    echo "1. Open index.html directly in your browser"
    echo "2. Use Node.js: npx live-server"
    echo "3. Use PHP: php -S localhost:8000"
    exit 1
fi
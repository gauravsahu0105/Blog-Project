@echo off
echo 🚀 Setting up MERN Blog Platform...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

echo 📦 Installing backend dependencies...
cd backend
call npm install

echo 📦 Installing frontend dependencies...
cd ..\frontend
call npm install

echo ✅ Setup complete!
echo.
echo 📋 Next steps:
echo 1. Create a .env file in the backend directory with:
echo    MONGO_URI=mongodb://localhost:27017/blog-platform
echo    JWT_SECRET=your-super-secret-jwt-key-here
echo    PORT=5000
echo.
echo 2. Start the backend server:
echo    cd backend ^&^& npm run dev
echo.
echo 3. Start the frontend server:
echo    cd frontend ^&^& npm run dev
echo.
echo 🌐 The application will be available at:
echo    Frontend: http://localhost:3000
echo    Backend: http://localhost:5000
pause

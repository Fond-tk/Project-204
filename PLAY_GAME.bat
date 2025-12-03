@echo off
setlocal
color 0A
title JS Quest - System Initialization

:: ==========================================
::  PHASE 1: RUNTIME CHECK
:: ==========================================
cls
echo [SYSTEM] Initializing environment...
echo [SYSTEM] Verifying runtime dependencies...

:: Check if Node is installed globally
node -v >nul 2>&1
if %errorlevel% equ 0 (
    echo [CHECK]  Runtime: Node.js detected ............ [OK]
    goto :PHASE_2
)

:: ==========================================
::  PHASE 2: PACKAGE MANAGER (WinGet)
:: ==========================================
:INSTALL_NODE
echo.
echo [CHECK]  Runtime: Node.js ..................... [MISSING]
echo [OTA]    Initializing Windows Package Manager (WinGet)...
echo [OTA]    Requesting package: OpenJS.NodeJS.LTS
echo.
echo [PROMPT] Administrator permission required for installation.
echo          Please click "Yes" on the prompt to continue.
echo ---------------------------------------------------

:: This command triggers the UAC prompt and installs Node silently
winget install -e --id OpenJS.NodeJS.LTS --accept-source-agreements --accept-package-agreements

echo.
echo [OTA]    Installation complete.
echo [SYSTEM] Refreshing environment variables...
:: Refresh environment variables without restarting CMD
call RefreshEnv.cmd >nul 2>&1
:: Fallback refresh if RefreshEnv is missing
set "PATH=%PATH%;C:\Program Files\nodejs"

:: ==========================================
::  PHASE 3: DEPENDENCIES
:: ==========================================
:PHASE_2
echo.
echo [SYSTEM] Verifying project dependencies...

if not exist "node_modules" (
    echo [PKG]    Missing dependencies detected.
    echo [PKG]    Resolving packages via NPM...
    call npm install --no-audit --no-fund --loglevel=error
    echo [PKG]    Dependencies installed.
) else (
    echo [CHECK]  Dependencies ......................... [OK]
)

:: ==========================================
::  PHASE 4: LAUNCH
:: ==========================================
:LAUNCH
cls
echo ========================================================
echo  JS QUEST: CHRONICLES OF THE ARCANE MAGE
echo ========================================================
echo  [STATUS] System Ready.
echo  [ACTION] Launching Local Server on Port 3000...
echo.
echo  NOTE: Please keep this window OPEN while playing.
echo ========================================================

:: Run server
call npx -y http-server -p 3000 -o -c-1

pause
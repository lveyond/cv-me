@echo off
cd /d "%~dp0\.."
node "%~dp0encode-certs.cjs"
pause

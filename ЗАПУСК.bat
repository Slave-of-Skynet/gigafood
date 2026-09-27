@echo off
chcp 65001 > nul
echo ===================================================
echo   Запуск PackShift (Agrifood Packaging Selector)
echo ===================================================
echo Запуск локального сервера...
start "" "http://127.0.0.1:5173"
python scripts/demo.py
pause

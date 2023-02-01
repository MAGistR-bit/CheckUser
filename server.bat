@echo off
:: Устанавливаем порт
set port=3000
:: Запускаем веб-приложение в браузере по умолчанию
explorer http://localhost:%port%
node ./app.js %port%

# Getting Started with ugmk_test_app

npm install - установлены все зависимости
npm run start - приложение запускается на локальной машине по адресу localhost:3000
npm run dockerize - создаётся docker image c именем ugmk_test_app
npm run start-container - запускает контейнер с именем ugmk_test_app, приложение доступно по адресу localhost:3000 При завершении приложения, контейнер должен быть автоматически удалён

ToDo:
- перевод хранилища данных с контекста на Redux
- перевод кода на TypeScript
- отработка ошибок бэкенда
- настройка Nginx, чтобы в Docker не работал фронт как процесс
- разделить по проектам фронт и бэк
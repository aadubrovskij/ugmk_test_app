FROM node:lts-bullseye-slim

# создание директории приложения
WORKDIR /usr/src/app

# установка зависимостей
# символ астериск ("*") используется для того чтобы по возможности
# скопировать оба файла: package.json и package-lock.json
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3000

CMD [ "npm", "start" ]

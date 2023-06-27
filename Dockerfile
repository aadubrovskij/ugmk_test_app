FROM node:alpine as builder

# создание директории приложения
WORKDIR /usr/src/app

# установка зависимостей
# символ астериск ("*") используется для того чтобы по возможности
# скопировать оба файла: package.json и package-lock.json
# COPY package*.json ./
#COPY build ./build
COPY . .
COPY build ./build

FROM alpine:3.14

EXPOSE 3000
EXPOSE 3001

RUN apk add --update npm
RUN apk add nginx openrc
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY --from=builder /usr/src/app/ /usr/src/app
COPY nginx/nginx.conf /etc/nginx/nginx.conf
RUN nginx
WORKDIR /usr/src/app

CMD [ "npm", "run", "full-deploy" ]

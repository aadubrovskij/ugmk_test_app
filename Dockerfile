FROM node:alpine

EXPOSE 3000

WORKDIR /usr/src/app

COPY . .
RUN apk add nginx
RUN rm -rf /usr/share/nginx/html/*
RUN npm ci
RUN npm run build
COPY build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]

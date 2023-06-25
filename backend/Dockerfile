FROM node:alpine

EXPOSE 3001

WORKDIR /usr/src/app

COPY . .
RUN npm ci

CMD [ "npm", "run", "start-server" ]

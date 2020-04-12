FROM node:10

COPY package*.json ./

ENV USER_MICROSERVICE_PORT 8080

WORKDIR /

RUN npm install

COPY . .

EXPOSE 8080

ENTRYPOINT [ "npm", "run", "start" ]
FROM node:10

COPY package*.json ./

ENV ORDER_MICROSERVICE_PORT 8085

WORKDIR /

RUN npm install

COPY . .

EXPOSE 8085

ENTRYPOINT [ "npm", "run", "start" ]
FROM node:10

COPY package*.json ./

ENV AGGREGATOR_MICROSERVICE_PORT 8086

WORKDIR /

RUN npm install

COPY . .

EXPOSE 8086

ENTRYPOINT [ "npm", "run", "start" ]
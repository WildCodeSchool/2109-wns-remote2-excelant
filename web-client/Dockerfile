FROM node:14.17-alpine

RUN mkdir /web-client
WORKDIR /web-client
COPY package*.json ./
RUN npm ci
COPY ./src ./src
COPY ./public ./public

CMD npm start

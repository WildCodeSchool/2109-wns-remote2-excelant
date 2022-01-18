FROM node:14.17-alpine

RUN mkdir /server
WORKDIR /server
COPY package*.json ./
RUN npm install
COPY ./src ./src

CMD npm start

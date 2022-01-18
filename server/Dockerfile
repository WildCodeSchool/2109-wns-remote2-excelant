FROM node:14.17-alpine

RUN mkdir /server
WORKDIR /server
COPY . .
RUN npm install

CMD npm run start:build

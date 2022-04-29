FROM node:14.17-alpine as base

RUN mkdir /server
WORKDIR /server

COPY package*.json ./

RUN npm i

COPY . .

FROM base as production

ENV NODE_PATH=./build

RUN ["npm", "run", "build"]

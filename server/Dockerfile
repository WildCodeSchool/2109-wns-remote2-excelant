FROM node:14.17-alpine as tsc-builder

RUN mkdir /server
WORKDIR /server
COPY . .
RUN npm ci && npm run build

FROM node:14.17-alpine as runtime-container
RUN mkdir /server
WORKDIR /server

COPY --from=tsc-builder /server/build ./build
COPY --from=tsc-builder /server/config ./config
COPY --from=tsc-builder ["/server/package.json", "./"] 
COPY --from=tsc-builder ["/server/package-lock.json", "./"] 

RUN npm ci

CMD ["node", "./build/src/server.js"]

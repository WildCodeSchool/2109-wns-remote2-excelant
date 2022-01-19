# 2109-wns-remote2-excelant

## Contributing

- Emmanuelle Wild
- Amanel Gauriat
- Pierre Muller
- Lionel Delamare

### Installation

1.  Clone this repo

    ```
    git clone https://github.com/WildCodeSchool/2109-wns-remote2-excelant.git
    cd <app-name>
    ```

2.  #### Start

    -   Back-end
        ```
        cd server
        npm i
        npm run start:dev
        ```
    -   Front-end
        ```
        cd web-client
        npm i
        npm start
        ```

## Docker

```
docker-compose -f docker-compose.dev.yml up --build
```

## Project structure

```
./project_root
|_ server
|  |_ src
|  | server.ts
|
|_ web-client
  |_ src
```

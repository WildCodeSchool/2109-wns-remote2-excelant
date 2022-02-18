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

    - Back-end

      ```shell
      cd server

      # switch to the projects nodejs version
      nvm use
      npm ci
      npm run start:dev
      ```

    - Front-end

      ```shell
      cd web-client

      # switch to the projects nodejs version
      nvm use
      npm ci
      npm start
      ```

## Docker

```
docker-compose -f docker-compose.dev.yml up --build
```

## Launch with `make`

**Requirements**

- `make` package

**Start development environment**

```
$ make start-dev
```

**Start production environment**

```
$ make start
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

## Mobile app

```
1. Copy ".env" file and rename it as ".env.local"
2. Change the API_URL value in your ".env.local" into your ip adress
```

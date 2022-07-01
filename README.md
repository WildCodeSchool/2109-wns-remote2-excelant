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

2.  Install dependencies

```shell
cd server
nvm use
npm i

cd ../client
npm i
```

### Launch with `make`

**Requirements**

- `make` package

**Start development environment**

```shell
make start
```

**Start production environment**

```shell
make start-prod
```

**Stop docker**

```
make stop
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

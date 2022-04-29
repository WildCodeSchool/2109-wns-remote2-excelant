.PHONY: start start-prod stop

start-prod:
	GATEWAY_PORT=8000 docker-compose -f docker-compose.yml -f docker-compose.production.yml up --build
start:
	docker-compose -f docker-compose.yml up --build
stop:
	docker-compose down

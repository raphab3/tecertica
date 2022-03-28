include .env

.PHONY: dev
dev:
	docker-compose -f docker-compose.yml up -d

.PHONY: down
down:
	docker-compose -f docker-compose.yml down

.PHONY: restart
restart:
	docker container restart tecertifica-api

.PHONY: build
build:
	docker exec -it tecertifica-api sh -c "yarn build"

.PHONY: logs
logs:
	docker container logs -f --tail 100 tecertifica-api




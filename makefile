run-dev:
	docker compose -f  docker-compose.dev.yaml --env-file .env up --build

run-prod:
	docker compose -f docker-compose.prod.yaml --env-file .env.build up --build

stop:
	docker compose -f docker-compose.dev.yaml down

stop-prod:
	docker compose -f docker-compose.prod.yaml down
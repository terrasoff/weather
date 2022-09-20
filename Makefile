install:
	docker-compose run --rm node bash -c "npm ci"

up: install
	docker-compose up -d webpack

lint:
	docker-compose run --rm node bash -c "npm run lint"

test:
	docker-compose run --rm node bash -c "jest --runInBand"

down:
	docker-compose down --rmi=local -v
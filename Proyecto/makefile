# Variables
IMAGE_NAME = build
APP_PORT_HOST = 3000
APP_PORT_CONTAINER = 5173
DB_NAME = servidor
DB_PASSWORD = password
DB_PORT_HOST = 5431
DB_PORT_CONTAINER = 5432

.PHONY: build run run-db clean help

build:
	@echo "Construyendo la imagen Docker..."
	docker build . -t $(IMAGE_NAME)

run: build
	@echo "Iniciando la aplicación..."
	docker run -dp $(APP_PORT_HOST):$(APP_PORT_CONTAINER) $(IMAGE_NAME)
	@echo "Aplicación disponible en http://localhost:$(APP_PORT_HOST)"

run-db:
	@echo "Iniciando PostgreSQL..."
	docker run --name $(DB_NAME) -e POSTGRES_PASSWORD=$(DB_PASSWORD) -p $(DB_PORT_HOST):$(DB_PORT_CONTAINER) -d postgres
	@echo "PostgreSQL disponible en localhost:$(DB_PORT_HOST)"

clean:
	@echo "Deteniendo y eliminando contenedores..."
	-docker stop $(IMAGE_NAME) $(DB_NAME)
	-docker rm $(IMAGE_NAME) $(DB_NAME)
	@echo "Contenedores eliminados"

help:
	@echo "Opciones disponibles:"
	@echo "  make build    - Construye la imagen Docker"
	@echo "  make run      - Ejecuta la aplicación"
	@echo "  make run-db   - Ejecuta PostgreSQL"
	@echo "  make clean    - Limpia los contenedores"
	@echo "  make help     - Muestra esta ayuda"
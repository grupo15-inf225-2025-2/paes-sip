
IMAGE_NAME = build
CONTAINER_NAME = build-app  
APP_PORT_HOST = 3000
APP_PORT_CONTAINER = 5173
DB_NAME = servidor
DB_PASSWORD = password
DB_PORT_HOST = 5431
DB_PORT_CONTAINER = 5432

.PHONY: build run run-db clean clean-app clean-db help

build:
	@echo "Construyendo la imagen Docker..."
	docker build . -t $(IMAGE_NAME)

run: build
	@echo "Iniciando la aplicación..."
	docker run -dp $(APP_PORT_HOST):$(APP_PORT_CONTAINER) --name $(CONTAINER_NAME) $(IMAGE_NAME)
	@echo "Aplicación disponible en http://localhost:$(APP_PORT_HOST)"

run-db:
	@echo "Iniciando PostgreSQL..."
	docker run --name $(DB_NAME) -e POSTGRES_PASSWORD=$(DB_PASSWORD) -p $(DB_PORT_HOST):$(DB_PORT_CONTAINER) -d postgres
	@echo "PostgreSQL disponible en localhost:$(DB_PORT_HOST)"

clean-app:
	@echo "Deteniendo y eliminando contenedor de la aplicación..."
	@if docker inspect $(CONTAINER_NAME) >/dev/null 2>&1; then \
		docker stop $(CONTAINER_NAME) && docker rm $(CONTAINER_NAME); \
		echo "Contenedor $(CONTAINER_NAME) eliminado"; \
	else \
		echo "El contenedor $(CONTAINER_NAME) no existe"; \
	fi

clean-db:
	@echo "Deteniendo y eliminando contenedor de PostgreSQL..."
	@if docker inspect $(DB_NAME) >/dev/null 2>&1; then \
		docker stop $(DB_NAME) && docker rm $(DB_NAME); \
		echo "Contenedor $(DB_NAME) eliminado"; \
	else \
		echo "El contenedor $(DB_NAME) no existe"; \
	fi

clean: clean-app clean-db

help:
	@echo "Opciones disponibles:"
	@echo "  make build     - Construye la imagen Docker"
	@echo "  make run       - Ejecuta la aplicación (contenedor nombrado)"
	@echo "  make run-db    - Ejecuta PostgreSQL"
	@echo "  make clean-app - Limpia solo la aplicación"
	@echo "  make clean-db  - Limpia solo la base de datos"
	@echo "  make clean     - Limpia todos los contenedores"
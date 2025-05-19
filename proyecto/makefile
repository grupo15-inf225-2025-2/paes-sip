IMAGE_NAME = build
CONTAINER_NAME = build-app  
APP_PORT_HOST = 3000
APP_PORT_CONTAINER = 3000
DB_NAME = servidor
DB_PASSWORD = password
DB_PORT_HOST = 5431
DB_PORT_CONTAINER = 5432

# Rama git actual (reemplaza '/' por '-')
BRANCH = $(shell git rev-parse --abbrev-ref HEAD | sed 's|/|-|g')

# Nombre dinamico del contenedor segun branch
CONTAINER_NAME     = build-app-$(BRANCH)


.PHONY: build run start stop run-db clean clean-app clean-db help

build:
	@echo "Construyendo la imagen Docker..."
	docker build . -t $(IMAGE_NAME)


run: build
	@echo "Iniciando la app en rama '$(BRANCH)' con hot-reload…"
	docker run --rm -dp $(APP_PORT_HOST):$(APP_PORT_CONTAINER) \
      	--name $(CONTAINER_NAME) \
      	-v "$(PWD)/cliente":/app/cliente \
    	-v /app/cliente/node_modules \
      	$(IMAGE_NAME)
	@echo "App disponible en http://localhost:$(APP_PORT_HOST)"
	@echo "Para ver los logs: docker logs -f $(CONTAINER_NAME)"

# Inicia un contenedor ya existente
start:
	@echo "Iniciando contenedor existente $(CONTAINER_NAME)..."
	@docker start $(CONTAINER_NAME) && \
		echo "Contenedor iniciado. App disponible en http://localhost:$(APP_PORT_HOST)" || \
		echo "Error al iniciar. ¿Existe el contenedor? Intenta 'make run' primero."
	@echo "Para ver los logs: docker logs -f $(CONTAINER_NAME)"

# Detiene el contenedor sin eliminarlo
stop:
	@echo "Deteniendo contenedor $(CONTAINER_NAME)..."
	@docker stop $(CONTAINER_NAME) && \
		echo "Contenedor detenido. Usa 'make start' para reiniciarlo." || \
		echo "Error al detener. ¿Existe el contenedor?"

run-db:
	@echo "Iniciando PostgreSQL..."
	@- docker rm -f $(DB_NAME) 2>/dev/null || true
	docker run --name $(DB_NAME) \
		-e POSTGRES_PASSWORD=$(DB_PASSWORD) \
		-p $(DB_PORT_HOST):$(DB_PORT_CONTAINER) \
		-d postgres
	@echo "PostgreSQL disponible en localhost:$(DB_PORT_HOST)"

clean-app:
	@echo "Eliminando contenedor $(CONTAINER_NAME)…"
	@-docker rm -f $(CONTAINER_NAME) 2>/dev/null && \
	   echo "Contenedor borrado" || \
	   echo "No existia $(CONTAINER_NAME)"

clean-db:
	@echo "Eliminando contenedor servidor…"
	@-docker rm -f servidor 2>/dev/null && \
	   echo "Contenedor borrado" || \
	   echo "No existía servidor"

clean: clean-app clean-db

help:
	@echo "Opciones disponibles:"
	@echo "  make build     - Construye la imagen Docker"
	@echo "  make run       - build + arranca container para desarrollo en segundo plano"
	@echo "  make start     - Inicia un contenedor existente"
	@echo "  make stop      - Detiene el contenedor sin eliminarlo"
	@echo "  make run-db    - Ejecuta PostgreSQL"
	@echo "  make clean-app - Detiene y borra el container de la app"
	@echo "  make clean-db  - Detiene y borra el container de la base de datos"
	@echo "  make clean     - Limpia todos los contenedores"
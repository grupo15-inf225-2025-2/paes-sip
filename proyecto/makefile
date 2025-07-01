# Variables generales
IMAGE_NAME = proyecto-app

DB_USER ?= postgres
DB_PASSWORD ?= postgres
DB_PORT_HOST ?= 5432
DB_PORT_CONTAINER ?= 5432
BACKEND_PORT_HOST ?= 3001
BACKEND_USER_PORT_HOST ?= 3002
APP_PORT_HOST ?= 5173
AUTH_DB_PORT_HOST ?= 5433

export DB_USER DB_PASSWORD DB_PORT_HOST DB_PORT_CONTAINER BACKEND_PORT_HOST APP_PORT_HOST AUTH_DB_PORT_HOST BACKEND_USER_PORT_HOST

# Variables dinámicas
BRANCH = $(shell git rev-parse --abbrev-ref HEAD | sed 's|/|-|g')
CONTAINER_NAME = proyecto-app-$(BRANCH)

# Dependencias
BACKEND_DEPS = express cors pg sequelize dotenv axios
BACKEND_DEPS_USER = express cors pg sequelize dotenv axios
FRONTEND_DEPS = react react-dom react-router-dom axios vite @vitejs/plugin-react

.PHONY: build build-backend-user build-backend build-frontend run start stop run-db install-deps install-backend install-frontend clean clean-all help

# Construcción de imágenes
build: build-backend-user build-backend build-frontend
	docker compose build

build-backend:
	@echo "Construyendo imagen del backend..."
	docker build -t $(IMAGE_NAME)-backend -f server/Dockerfile ./server

build-backend-user:
	@echo "Construyendo imagen del backend-user..."
	docker build -t $(IMAGE_NAME)-backend-user -f server-user/Dockerfile ./server-user

build-frontend:
	@echo "Construyendo imagen del frontend..."
	docker build -t $(IMAGE_NAME)-frontend -f cliente/Dockerfile ./cliente

# Ejecución
run: run-db
	@echo "Iniciando aplicación en rama '$(BRANCH)'..."
	docker compose up -d
	@echo "Frontend disponible en http://localhost:$(APP_PORT_HOST)"
	@echo "Backend disponible en http://localhost:$(BACKEND_PORT_HOST)"
	@echo "PostgreSQL disponible en localhost:$(DB_PORT_HOST)"

start:
	@echo "Iniciando contenedores existentes..."
	@docker compose start && \
		echo "Aplicación iniciada" || \
		echo "Error al iniciar. ¿Existen los contenedores? Intenta 'make run' primero."

stop:
	@echo "Deteniendo contenedores..."
	@docker compose stop && \
		echo "Contenedores detenidos. Usa 'make start' para reiniciar." || \
		echo "Error al detener."

# Base de datos
run-db:
	@echo "Iniciando PostgreSQL..."
	@docker compose up -d db
	@sleep 5  # Espera breve para que la DB esté lista
	@echo "PostgreSQL listo en localhost:$(DB_PORT_HOST)"

# Instalación de dependencias
install-deps: install-backend install-frontend install-backend-user

install-backend:
	@echo "Instalando dependencias del backend..."
	@cd server && npm install $(BACKEND_DEPS)

install-backend-user:
	@echo "Instalando dependencias del backend..."
	@cd server && npm install $(BACKEND_DEPS_USER)

install-frontend:
	@echo "Instalando dependencias del frontend..."
	@cd cliente && npm install $(FRONTEND_DEPS)

# Limpieza
clean:
	@echo "Limpiando contenedores..."
	@docker compose down
	@echo "Contenedores eliminados"

clean-all: clean
	@echo "Limpiando imágenes y volúmenes..."
	@docker rmi -f $(IMAGE_NAME)-backend $(IMAGE_NAME)-frontend 2>/dev/null || true
	@docker volume rm -f proyecto_postgres_data 2>/dev/null || true
	@echo "Limpieza completa"

help:
	@echo "Opciones disponibles:"
	@echo "  make build           - Construye todas las imágenes Docker"
	@echo "  make build-backend   - Construye solo la imagen del backend"
	@echo "  make build-frontend  - Construye solo la imagen del frontend"
	@echo "  make run             - Inicia toda la aplicación (frontend, backend y DB)"
	@echo "  make start           - Inicia contenedores existentes"
	@echo "  make stop            - Detiene contenedores sin eliminarlos"
	@echo "  make run-db          - Inicia solo la base de datos"
	@echo "  make install-deps    - Instala todas las dependencias"
	@echo "  make install-backend - Instala dependencias del backend"
	@echo "  make install-frontend- Instala dependencias del frontend"
	@echo "  make clean           - Elimina contenedores"
	@echo "  make clean-all       - Elimina contenedores, imágenes y volúmenes"
	@echo "  make help            - Muestra esta ayuda"
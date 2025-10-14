# Variables generales
IMAGE_NAME = proyecto-app

DB_USER ?= postgres
DB_PASSWORD ?= postgres
DB_PORT_HOST ?= 5432
DB_PORT_CONTAINER ?= 5432
BACKEND_PORT_HOST ?= 3001
APP_PORT_HOST ?= 5173
DB_NAME ?= myapp

export DB_USER DB_PASSWORD DB_PORT_HOST DB_PORT_CONTAINER BACKEND_PORT_HOST APP_PORT_HOST DB_NAME

# Variables dinámicas
CONTAINER_NAME = proyecto-app
ENV_FILE = .env

# Dependencias
BACKEND_DEPS = express cors pg sequelize dotenv axios
FRONTEND_DEPS = react react-dom react-router-dom axios vite @vitejs/plugin-react

.PHONY: check-env build build-backend build-frontend run start stop run-db install-deps install-backend install-frontend clean clean-all help


check-env:
	@if [ ! -f $(ENV_FILE) ]; then \
		echo "⚙️  Archivo .env no encontrado. Creando uno nuevo..."; \
		echo "# =============================" > $(ENV_FILE); \
		echo "# ⚙️ CONFIGURACIÓN GENERAL" >> $(ENV_FILE); \
		echo "# =============================" >> $(ENV_FILE); \
		echo "APP_PORT_HOST=$(APP_PORT_HOST)" >> $(ENV_FILE); \
		echo "BACKEND_PORT_HOST=$(BACKEND_PORT_HOST)" >> $(ENV_FILE); \
		echo "" >> $(ENV_FILE); \
		echo "# =============================" >> $(ENV_FILE); \
		echo "# 🗄️ CONFIGURACIÓN BASE DE DATOS" >> $(ENV_FILE); \
		echo "# =============================" >> $(ENV_FILE); \
		echo "DB_USER=$(DB_USER)" >> $(ENV_FILE); \
		echo "DB_PASSWORD=$(DB_PASSWORD)" >> $(ENV_FILE); \
		echo "DB_PORT_HOST=$(DB_PORT_HOST)" >> $(ENV_FILE); \
		echo "DB_PORT_CONTAINER=$(DB_PORT_CONTAINER)" >> $(ENV_FILE); \
		echo "DB_NAME=$(DB_NAME)" >> $(ENV_FILE); \
		echo "✅ Archivo .env creado correctamente."; \
	else \
		echo "✅ Archivo .env encontrado."; \
	fi


build: check-env build-backend build-frontend
	docker compose build

build-backend:
	@echo "Construyendo imagen del backend..."
	docker build -t $(IMAGE_NAME)-backend -f server/Dockerfile ./server

build-frontend:
	@echo "Construyendo imagen del frontend..."
	docker build -t $(IMAGE_NAME)-frontend -f cliente/Dockerfile ./cliente


run: check-env run-db
	@echo "Iniciando aplicación en rama '$(BRANCH)'..."
	docker compose up -d --build
	@echo "Frontend disponible en 👉 http://localhost:$(APP_PORT_HOST)"
	@echo "Backend disponible en  👉 http://localhost:$(BACKEND_PORT_HOST)"
	@echo "Resultados API en      👉 http://localhost:$(BACKEND_PORT_HOST)/api/resultados/listar"
	@echo "Base de datos en       👉 localhost:$(DB_PORT_HOST)"


start:
	@echo "Iniciando contenedores existentes..."
	@docker compose start && \
		echo "✅ Aplicación iniciada correctamente." || \
		echo "⚠️  Error al iniciar. Prueba 'make run' primero."

stop:
	@echo "🛑 Deteniendo contenedores..."
	@docker compose stop && \
		echo "🧱 Contenedores detenidos. Usa 'make start' para reiniciar." || \
		echo "⚠️  Error al detener contenedores."


run-db: check-env
	@echo "Iniciando PostgreSQL..."
	@docker compose up -d db
	@sleep 5
	@echo "✅ PostgreSQL listo en localhost:$(DB_PORT_HOST)"


clean:
	@echo "🧹 Eliminando contenedores..."
	@docker compose down
	@echo "✅ Contenedores eliminados."

clean-all: clean
	@echo "💣 Eliminando imágenes y volúmenes..."
	@docker rmi -f $(IMAGE_NAME)-backend $(IMAGE_NAME)-frontend 2>/dev/null || true
	@docker volume rm -f proyecto_postgres_data 2>/dev/null || true
	@echo "✅ Limpieza completa."


help:
	@echo "Comandos disponibles:"
	@echo "  make build           → Construye todas las imágenes Docker"
	@echo "  make build-backend   → Construye solo la imagen del backend"
	@echo "  make build-frontend  → Construye solo la imagen del frontend"
	@echo "  make run             → Inicia toda la aplicación (frontend, backend y DB)"
	@echo "  make run-db          → Inicia solo la base de datos"
	@echo "  make start           → Inicia contenedores existentes"
	@echo "  make stop            → Detiene contenedores sin eliminarlos"
	@echo "  make clean           → Elimina contenedores"
	@echo "  make clean-all       → Elimina contenedores, imágenes y volúmenes"
	@echo "  make help            → Muestra esta ayuda"

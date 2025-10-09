# Estructura del proyecto

```bash
├── .dockerignore
├── .gitignore
├── README.md                        ← Este archivo
├── cliente                          ← Frontend React + Vite
│   ├── eslint.config.js
│   ├── index.html
│   ├── node_modules                 ← Dependencias de npm
│   ├── package-lock.json
│   ├── package.json
│   ├── src                          ← Paginas de la aplicación
│   └── vite.config.js
├── dockerfile                       ← Configuración de Docker
└── servidor
    ├── controllers
    ├── models
    └── routes
```

## Setup

- Duplicar el archivo `.env.example` con el nombre `.env`.
- (Opcional) Cambiar las variables de entorno dentro de `.env` según sus preferencias.

## Comandos útiles

_(Estando en la ruta paes-sip/proyecto/)_

| Comando                | Descripción                                                             |
| ---------------------- | ----------------------------------------------------------------------- |
| `docker compose up -d` | Crea los contenedores para la web, la api y la base de datos.           |
| `docker compose down`  | Detiene todos los contenedores de este proyecto que estén en ejecución. |

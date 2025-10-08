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
├── makefile                         ← Tareas: build, run, run-db, clean
└── servidor
    ├── controllers
    ├── models
    └── routes
```

## Comandos útiles

| Comando     | Descripción                              |
|-------------|------------------------------------------|
| `make build`| Construye la imagen Docker               |
| `make run`  | Construye la imagen y arranca el contenedor en segundo plano con hot-reload              |
| `make stop`      | Detiene el contenedor sin eliminarlo                                        |
| `make run-db`    | Ejecuta un contenedor con PostgreSQL                                        |
| `make clean-app` | Elimina el contenedor de la aplicación                                      |
| `make clean-db`  | Elimina el contenedor de la base de datos                                   |
| `make clean`     | Elimina todos los contenedores (app y base de datos)                        |
| `make help`      | Muestra todos los comandos disponibles                            |

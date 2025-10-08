# GRUPO 15
Repositorio del Proyecto Grupo 15 Profesor Ricardo Salas Paralelo 200

* Martina Madrid - 202230533-9
* Sebastian Romero - 202030506-4
* Sebastian Torres - 202330566-9
* Sebastián Vicuña - 202230561-4
* **Tutor** BENJAMIN NICOLAS DAZA JIMENEZ

## Wiki
* Puede acceder a la Wiki mediante el siguiente [enlace](https://github.com/grupo15-inf225-2025-2/paes-sip/wiki)


## Poyecto Base

* El proyecto que ocuparemos como base corresponde al trabajo del antiguo grupo 12 del ramo INF236 en el semestre 2025-1, del cual dos de sus integrantes (Martina Madrid y Sebastián Vicuña) se encuentran actualmente en este grupo.
  
## Videos
* Video presentación cliente [aqui](https://usmcl-my.sharepoint.com/:v:/g/personal/claudio_carreno_usm_cl/EQ1_1EaAYddAkW_vgU2wwFkBc2UOmd4ZwCz0bDELah-S9Q?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=rruca9)
* Video hito 3, se encuentra en el siguiente [enlace](https://usmcl-my.sharepoint.com/:v:/g/personal/martina_madrid_usm_cl/EShtc_coro5BhPXSUvXuaCoBO4scJWu9Savlf0X_885fxQ?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=V7OKYm)


---

## Levantamiento del Proyecto
Nuestro proyecto está siendo desarrollado con un frontend en [React/Vite](https://vitejs.dev/) y un backend en Node.js junto con una base de datos PostgreSQL.


### Prerrequisitos
- [Node.js](https://nodejs.org/) (v18+ recomendado) Hay que instalarlo en la pagina web o por comando, favor de seguir instrucciones de la pagina.
- [Docker](https://www.docker.com/products/docker-desktop/) Instalar y configurarlo si es necesario con la integración para WSL2

### Instalación
1. Clona el repositorio
    ```bash
   git clone https://github.com/grupo15-inf225-2025-2/paes-sip.git

2. Ubica la carpeta en la terminal
    ```bash
   cd ./paes-sip/proyecto

3. Instala las dependencias necesarias para cliente
   ```bash
   cd ./paes-sip/proyecto/cliente
   npm install

4. Construir la imagen de docker
   ```bash
   make build
   
5. Levanta frontend + hot-reload
   ```bash
   make run
   
6. En el navegador poner el enlace que dara la terminal

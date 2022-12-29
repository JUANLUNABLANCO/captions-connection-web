# Captionsconnection

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.1.


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

`node ngProd.js` lanza la app que está en dist, por si quieres probarla

## GIT CONFIGURATIONS

	> git init
	> git config --local user.email "desarrolloaplicacionesweb.jmlb@gmail.com"
	> git config --local user.name "JUANLUNABLANCO"
	> git branch -M  main

	En este punto debes crear un repositorio nuevo en github vac铆o y enlazarlo

	<!-- > git remote add origin https://github.com/JUANLUNABLANCO/<tu-repo>.git -->
    
    en caso que ya tuviésemos apuntando nuestro repo local a otro podemos borrar el origin así
    > git remote remove origin

	> git remote add origin https://github.com/JUANLUNABLANCO/captions-connection-web.git
	> git config --list
	> git add .
	> git commit -m "scaffolding project with webpack"
	> git push -u origin main


## Netlify (subir app_client)

    > npm i -g netlify-cli

    > netlify --version

    > ng build --prod

    > netlify deploy --prod
        - create a new site: y
        - site name: captions-connection
        - publish directory: dist

## AZURE MICROSOFT (subir app_server)

Crear cuenta en azure de microsoft y seleccionar crear una web app

creamos un recurso nuevo llamado: node_captionsconnection_app
nombre del proyecto web: captionsconnection-api
Publicar
    Código                  --> por esta vez lo haremos con código desde github
  	Contenedor Docker
  	Aplicación web estática
Pila de ejecución: Node 16.0LTS
planes del servicio cambiar a Desarrollo y prueba Gratis 1GB de Ram

Ahora vamos al recurso y aparece un panel, con un montón de opciones:

debes subir tu proyecto a github si no lo tenías y consumir la url del proyecto de github para usarlo en azure

    https://github.com/JUANLUNABLANCO/captions-connection.git

en el proyecto de node deben cumplirse 2 cosas para poder ejecutarlo en azure:

    1. necesitamos indicarle esta variable de entorno en algún sitio, para que escuche en el puerto que nos indique azure: process.env.PORT
    en nuestro caso así queda el código:

        global._PORT = process.env.PORT || CONFIG.PORT;

    2. scripts: {
        start: "node src/server.js"
    }

Ahora en Azure nos vamos al centro de implementación
seleccionas github o donde tengas el proyecto, la rama y un para de cosas más y aceptar

te genera un archivo que debes copiar

--- .github/workflows/main_captionsconnection-api.yml ---
name: Build and deploy Node.js app to Azure Web App - captionsconnection-api

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Set up Node.js version
        uses: actions/setup-node@v1
        with:
          node-version: '16.x'

      - name: npm install, build, and test
        run: |
          npm install
          npm run build --if-present
          npm run test --if-present

      - name: Upload artifact for deployment job
        uses: actions/upload-artifact@v2
        with:
          name: node-app
          path: .

  deploy:
    runs-on: ubuntu-latest
    needs: build
    environment:
      name: 'production'
      url: ${{ steps.deploy-to-webapp.outputs.webapp-url }}

    steps:
      - name: Download artifact from build job
        uses: actions/download-artifact@v2
        with:
          name: node-app

      - name: 'Deploy to Azure Web App'
        id: deploy-to-webapp
        uses: azure/webapps-deploy@v2
        with:
          app-name: 'captionsconnection-api'
          slot-name: 'production'
          publish-profile: ${{ secrets.AzureAppService_PublishProfile_0bcf62534cb5440cbee4d723de00402c }}
          package: .
--- ---
    Guardar

    la uri de la app subida es:

    https://captionsconnection-api.azurewebsites.net/



## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## "ngx-bootstrap": "^6.2.0",

## cambios en la rama prueba de git

## errores en git bash

    1. ng command not found
    npm install -g @angular/cli@latest

## DOCKER

1º hemos creado el Dockerfile
2º hacemos un build de ese dockerfile

> docker build -t ccapp .

3º hemos lanzado un contenedor a partir de esa imagen

> docker run -it ccapp

4º Nos tira un error de conexion a la base de datos, debido a que no tenemos una base de datos en ese Dockerfile. Podríamos generar otro contenedor de mongo corriendo en el puerto 30030 y conectarlos con una red intermedia, pero es mejor usar docker-compose.yml

## DOCKER-COMPOSE

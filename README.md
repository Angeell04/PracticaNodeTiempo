# Aplicación de Clima y Geolocalización en Consola - Node.js

Aplicación interactiva por consola desarrollada en Node.js que realiza peticiones HTTP a APIs de terceros para consultar información meteorológica y de geolocalización en tiempo real.

## Características

- Menú interactivo en terminal con navegación mediante flechas (`inquirer` y `colors`).
- Búsqueda de lugares y coordenadas geográficas con la API de **Mapbox**.
- Consulta del estado del tiempo y temperaturas en tiempo real con **OpenWeatherMap**.
- Historial de las últimas 5 búsquedas con persistencia en archivo JSON local (`database/db.json`).

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/Angeell04/PracticaNodeTiempo.git
cd PracticaNodeTiempo
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura tus credenciales en el archivo `.env`:
```env
MAPBOX_KEY=tu_token_de_mapbox
OPENWEATHER_KEY=tu_token_de_openweathermap
```

## Ejecución

Para iniciar la aplicación:
```bash
node app.js
```

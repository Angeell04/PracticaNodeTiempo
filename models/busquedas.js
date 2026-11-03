const axios = require('axios');

class Busquedas {
    historial = [];

    mapboxToken = process.env.MAPBOX_KEY;
    openWeatherToken = process.env.OPENWEATHER_KEY;

    constructor() {
        this.historial = [];
    }

    async ciudad(lugar = '') {
        try {
            const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(lugar)}.json`;
            const resp = await axios.get(url, {
                params: {
                    access_token: this.mapboxToken,
                    limit: 5,
                    language: 'es'
                }
            });

            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }));

        } catch (error) {
            return [];
        }
    }

    async climaLugar(lat, lon) {
        try {
            const url = 'https://api.openweathermap.org/data/2.5/weather';
            const resp = await axios.get(url, {
                params: {
                    lat,
                    lon,
                    appid: this.openWeatherToken,
                    units: 'metric',
                    lang: 'es'
                }
            });

            const { weather, main } = resp.data;

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            };

        } catch (error) {
            return null;
        }
    }

    agregarHistorial(lugar = '') {
        if (this.historial.includes(lugar)) {
            return;
        }

        this.historial = this.historial.splice(0, 5);
        this.historial.unshift(lugar);
    }
}

module.exports = Busquedas;

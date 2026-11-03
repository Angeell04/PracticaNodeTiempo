require('dotenv').config();
require('colors');

const { 
    inquirerMenu, 
    pausa, 
    leerInput, 
    listarLugares 
} = require('./helpers/inquirer');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const Busquedas = require('./models/busquedas');

const main = async () => {
    let opt = '';
    const busquedas = new Busquedas();

    const historialDB = leerDB();
    if (historialDB) {
        busquedas.historial = historialDB;
    }

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const termino = await leerInput('Ciudad: ');
                const lugares = await busquedas.ciudad(termino);

                const id = await listarLugares(lugares);
                if (id === '0') continue;

                const lugarSel = lugares.find(l => l.id === id);

                busquedas.agregarHistorial(lugarSel.nombre);

                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);

                console.clear();
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:', lugarSel.nombre.green);
                console.log('Lat:', `${ lugarSel.lat }`.yellow);
                console.log('Lng:', `${ lugarSel.lng }`.yellow);

                if (clima) {
                    console.log('Temperatura:', `${ clima.temp }`.yellow);
                    console.log('Mínima:', `${ clima.min }`.yellow);
                    console.log('Máxima:', `${ clima.max }`.yellow);
                    console.log('Como está el clima:', clima.desc.green);
                } else {
                    console.log('\nNo se pudo obtener el clima.'.red);
                }
                break;

            case '2':
                console.log();
                busquedas.historial.forEach((lugar, i) => {
                    const idx = `${ i + 1 }.`.green;
                    console.log(`${ idx } ${ lugar }`);
                });
                break;
        }

        guardarDB(busquedas.historial);

        if (opt !== '0') await pausa();

    } while (opt !== '0');
};

main();

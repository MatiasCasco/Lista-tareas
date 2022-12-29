/*const { inquirerMenu } = require('./helpers/inquirer');
require('colors');
const argv = require('yargs').argv*/

import 'colors';
import *  as argv from 'yargs';
import { guardarDB, leerDB } from './helpers/guardarArchivo.cjs';
import {inquirerMenu, pausa, leerInput} from './helpers/inquirer.js';
import { Tareas } from './models/tareas.js';
//import { pausa } from './helpers/mensajes.js';

console.clear();

const main = async() => {
    console.log('Hola mundo');
    
    let opt = ' ';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if(tareasDB){
        //Establecer las tareas
    }

    await pausa();

    do {
        opt = await inquirerMenu();
        console.log({ opt });
        
        switch (opt) {
            case '1':
                    // crear opcion
                    const desc = await leerInput('Descripción: ');
                    tareas.crearTarea(desc);
                    console.log(desc);
                break;

            case '2':
                console.log(tareas.listadoArr);
                break;
        }
        
        //guardarDB(tareas.listadoArr);

        await pausa();
        //if ( opt !== '0') await pausa();

    } while( opt !== '0' );
    
    
}

main();
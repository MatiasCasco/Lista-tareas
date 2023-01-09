/*const { inquirerMenu } = require('./helpers/inquirer');
require('colors');
const argv = require('yargs').argv*/

import 'colors';
import *  as argv from 'yargs';
import { guardarDB, leerDB } from './helpers/guardarArchivo.cjs';
import {inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar} from './helpers/inquirer.js';
import { Tareas } from './models/tareas.js';
//import { pausa } from './helpers/mensajes.js';

console.clear();

const main = async() => {
    //console.log('Hola mundo');
    
    let opt = ' ';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if(tareasDB){
        //Establecer las tareas
        //TODO: cargar tareas
        tareas.cargarTareasFromArray(tareasDB);
    }

    //await pausa(); Esta pausa es para ver si lei el archivo ya no es necesaria

    do {
        opt = await inquirerMenu();
        //console.log({ opt });
        
        switch (opt) {
            case '1':
                    // crear opcion
                    const desc = await leerInput('Descripción: ');
                    tareas.crearTarea(desc);
                    console.log(desc);
                break;

            case '2':
                console.log(tareas.listadoCompleto());
                break;
            case '3':
                console.log(tareas.listarPendientesCompletadas(true));
                break;
            case '4':
                console.log(tareas.listarPendientesCompletadas(false));
                break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== '0') {
                    const ok = await confirmar('¿Está seguro?');
                    if( ok ) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada correctamente');
                    }
                }
                break;
        }
        
        guardarDB(tareas.listadoArr);

        await pausa();
        //if ( opt !== '0') await pausa();

    } while( opt !== '0' );
    
    
}

main();
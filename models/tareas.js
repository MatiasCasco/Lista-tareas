import {Tarea}  from "./tarea.js";


class Tareas {
    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    }

    constructor(){
        this._listado = {};
    }

    borrarTarea(id = '') {
        if ( this._listado[id] ) {
            delete this._listado[id];
        }
    }

    crearTarea (desc = ' ') {

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    cargarTareasFromArray(tareasDB = []) {
        tareasDB.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    listadoCompleto() {

        console.log();
        this.listadoArr.forEach((tarea, i) => {

            const idx = `${i + 1}.`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;

            console.log(`${idx} ${desc} :: ${estado} `);
            
        });
    }

    listarPendientesCompletadas ( completadas = true ) {
        
        let contador = 0;

        console.log();
        this.listadoArr.forEach((tarea) => {
            
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;

            if (completadas) { //mostrar completadas
                if (completadoEn) {
                    contador += 1;
                    console.log(`${contador.toString().green}. ${desc} :: ${estado} `);
                }
            } else { //mostrar pendientes
                if ( !completadoEn ) {
                    contador += 1;
                    console.log(`${contador.toString().red}. ${desc} :: ${estado} `);                    
                }
            }
         
        });


    }
}

export {
    Tareas
}
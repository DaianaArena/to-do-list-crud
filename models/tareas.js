//const { v4: uuidv4 } = require('uuid');
require('colors');

const Tarea = require("./tarea");

 

class Tareas {
    _listado = {};

    get listadoArr (){
        const listado = [];

        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado
    }

    constructor( desc ){
        this._listado = {};
    }

    borrarTarea (id){
        if (this._listado[id]){
             delete this._listado[id];
        }
    }

    traerTareasDB (tareas) {
        tareas.forEach(tarea => {
            
            this._listado[tarea.id] = tarea;
        });
    };

    crearTarea (desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    };

    listadoCompleto (tareas){  
        let contadorDeTareas = 1;
        let estaCompletado;
        console.log('\n'); //dejar un espacio
        tareas.forEach(tarea => {
            //Darle formato a la lista
            let numeroTarea = `${contadorDeTareas}.`.magenta
            if (tarea.completadoEn === null){
                estaCompletado = `Pendiente`.red;
            } else {
                estaCompletado = `Completada`.green;
            }
            console.log(`${numeroTarea} ${tarea.desc}:: ${estaCompletado}`)
            contadorDeTareas++;
        });
    }

    listadoFiltrado (tareas, filtro){
        let estado = "";
        let contadorDeTareas = 1;
        let numeroTarea = "";

        if (filtro == false){
            //muestro completadas
            estado = `Completada`.green;
            tareas.forEach(tarea => {
                //Darle formato a la lista
                if (tarea.completadoEn !== null){
                numeroTarea = `${contadorDeTareas}.`.magenta;
                console.log(`${numeroTarea} ${tarea.desc}:: ${estado} el ${tarea.completadoEn}`)
                contadorDeTareas++;
                }
                
            });
        } else {
            //muestro pendientes
            estado = `Pendiente`.red;
            tareas.forEach(tarea => {
                //Darle formato a la lista
                if (tarea.completadoEn === null){
                numeroTarea = `${contadorDeTareas}.`.magenta;
                console.log(`${numeroTarea} ${tarea.desc}:: ${estado}`)
                contadorDeTareas++;
                }
                
            });
        }
    }

    toggleCompletadas (ids ){
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn ){

                tarea.completadoEn = new Date().toISOString(); //graba la fecha


            }
        });

        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }

}

module.exports = Tareas;
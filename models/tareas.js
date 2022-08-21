//const { v4: uuidv4 } = require('uuid');

const Tarea = require("./tarea");

 

class Tareas {
    _listado = {};

    constructor( desc ){
        this._listado = {};
    }

    crearTarea (desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    }

}

module.exports = Tareas;
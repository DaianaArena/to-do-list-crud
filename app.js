require('colors');


const { guardarDB, leerDB } = require('./helpers/guardararchivo');
//const { mostrarMenu, pausa } = require ('./helpers/mensajes')
const {inquirerMenu, 
        pausa,
        leerInput
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');



const main =  async() => {
    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    let estaPendiente = false;

    if (tareasDB){
        //trae las tareas desde el archivo json "base de datos"
        tareas.traerTareasDB (tareasDB)
    }


    do {
        //opt =  await mostrarMenu();
        
        opt =  await inquirerMenu();

        switch (opt) {
            case '1':
                //crear tarea
                const desc = await leerInput('Descripcion: ');
                console.log(desc);
                tareas.crearTarea(desc);
            break;

            case '2':
                //mostar lista de tareas
                tareas.listadoCompleto(tareas.listadoArr);
            break;

            case '3':
                //mostar lista de tareas completadas
                estaPendiente = false;
                tareas.listadoFiltrado(tareas.listadoArr, estaPendiente);
            break;

            case '4':
                //mostar lista de tareas pendientes
                estaPendiente = true;
                tareas.listadoFiltrado(tareas.listadoArr, estaPendiente);
            break;

        }

        guardarDB(tareas.listadoArr);

        if (opt !== '0') await pausa();

        

    } while (opt !== '0');
    
    //pausa();
};

main();
require('colors');


const { guardarDB, leerDB } = require('./helpers/guardararchivo');
//const { mostrarMenu, pausa } = require ('./helpers/mensajes')
const {inquirerMenu, 
        pausa,
        leerInput,
        listadoTareasBorrar,
        confirmar,
        listadoChecklist
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

            case '5':
                //marcar tareas como completadas
                const ids = await listadoChecklist(tareas.listadoArr);
                //console.log(ids)
                tareas.toggleCompletadas(ids);
            break;

            case '6':
            // Borrar tarea
            const id = await listadoTareasBorrar(tareas.listadoArr);
            console.log("\n");
            
            
            if ( id !== '0'){
                const ok = await confirmar('Está seguro?');
                if (ok){
                    tareas.borrarTarea(id);
                    console.log(`\n${'TAREA BORRADA'.green}`);
                } else {
                    console.log(`\n${'LA TAREA NO FUE BORRADA'.red}`)
                }
            }
            

            break;
        }

        guardarDB(tareas.listadoArr);

        if (opt !== '0') await pausa();

        

    } while (opt !== '0');
    
    //pausa();
};

main();
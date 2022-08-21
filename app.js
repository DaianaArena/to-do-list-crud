require('colors');


//const { mostrarMenu, pausa } = require ('./helpers/mensajes')
const {inquirerMenu, 
        pausa,
        leerInput
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');



const main =  async() => {
    let opt = '';
    const tareas = new Tareas();

    do {
        //opt =  await mostrarMenu();
        
        opt =  await inquirerMenu();
        console.log({opt});

        switch (opt) {
            case '1':
                //crear tarea
                const desc = await leerInput('Descripcion: ');
                console.log(desc);
                tareas.crearTarea(desc);
            break;

            case '2':
                //mostar lista de tareas
                console.log(tareas._listado)
            break;



        }

        if (opt !== '0') await pausa();

        

    } while (opt !== '0');
    
    //pausa();
};

main();
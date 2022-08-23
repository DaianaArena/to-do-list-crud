const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: 'que desea hacer?',
        choices: [
            {
                value:'1',
                name: `${'1.'.magenta} Crear tarea`
            },
            {
                value:'2',
                name: `${'2.'.magenta}Listar tareas`
            },
            {
                value:'3',
                name: `${'3.'.magenta} Listar tareas completadas`
            },
            {
                value:'4',
                name: `${'4.'.magenta} Listar tareas pendientes`
            },
            {
                value:'5',
                name: `${'5.'.magenta} Completar tarea(s)`
            },
            {
                value:'6',
                name: `${'6'.magenta} Borrar tarea`
            },
            {
                value:'0',
                name: `${'0'.magenta} Salir`
            }
        ]
    }
]

const pausaArray = [
    {
        type: 'input',
        name: 'continuar',
        message: `\n${'>>'.green} Presione ${'ENTER'.magenta} para continuar \n`,
        choices: [ ]
    }
]

const inquirerMenu = async()=>{
    console.clear();

    console.log("=======================================".rainbow);
    console.log("          Seleccione una opción        ".white.bold);
    console.log("=======================================\n".rainbow);

    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;
}

const pausa = async() =>{
    console.log('\n');
    const { continuar } = await inquirer.prompt(pausaArray);

    return continuar;
};

const leerInput = async(message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if (value.length === 0){
                    return 'Debe ingresar un valor';
                }
                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);
    return desc;
    
};

const listadoTareasBorrar  = async (tareas) => {

    const choices = tareas.map((tarea, i) => {
        const idx = `${i+1}.`.magenta;
        
        return{
            value:tarea.id,
            name: `${idx} ${tarea.desc}`
        };
    });

    choices.unshift({
        value:'0',
        name: '0.'.magenta + 'Cancelar'
    })  //agrega una opcion al comienzo del array

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Elige cuál quieres borrar',
            choices
        }
    ]
    const { id } = await inquirer.prompt(preguntas);
    return id;
}

const listadoChecklist = async (tareas) => {

    const choices = tareas.map((tarea, i) => {
        const idx = `${i+1}.`.magenta;
        
        return{
            value:tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        };
    });


    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione:',
            choices
        }
    ]
    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}

const confirmar = async (message) =>{
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    console.log("\n");
    const { ok } = await inquirer.prompt(question);
    return ok;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    listadoChecklist
}
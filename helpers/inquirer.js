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
                name: '1. Crear tarea'
            },
            {
                value:'2',
                name: '2. Listar tareas'
            },
            {
                value:'3',
                name: '3. Listar tareas completadas'
            },
            {
                value:'4',
                name: '4. Listar tareas pendientes'
            },
            {
                value:'5',
                name: '5. Completar tarea(s)'
            },
            {
                value:'6',
                name: '6. Borrar tarea'
            },
            {
                value:'0',
                name: '0. Salir'
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

module.exports = {
    inquirerMenu,
    pausa,
    leerInput
}
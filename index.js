import express from 'express';
import { USERS_BBDD } from './bbdd.js';
import { MAESTROS_BBDD } from './bbddMaestros.js';

const PORT = 8080;
const expressApp = express();

expressApp.use(express.json())

//Obtiene una lista de los alumnos
expressApp.get("/alumnos/:id", (req, res) =>{
    const { id } = req.params;
    const user = USERS_BBDD.find((user) => user.id == id);
    if(!user) return res.status(404).send();
    return res.send(user);
});

//obtiene los datos de un alumno en específico
expressApp.get('/alumnos', (req, res) =>{
    const { id } = req.params;
    const user = USERS_BBDD;
    if(!user) return res.status(404).send();
    return res.send(user);
});

//agrega los datos de un alumno
expressApp.post('/alumnos', (req, res) =>{
    const { id, nombres, apellidos, matricula, promedio } = req.body;
    const user = USERS_BBDD.find((user) => user.id == id);
    if(!id || !nombres  || !apellidos || !matricula || !promedio) { 
    var datos = [];
    datos.push({
        "id":id,
        "nombres":nombres,
        "apellidos": apellidos,
        "matricula": matricula,
        "promedio": promedio
    })
    res.status(400); return res.send(datos);
    }
    if(user) return res.status(409).send();
    //if(!Number.isInteger(id)) return res.status(409).send();
    //if(nombres.find()) return res.status(409).send();
    //if(!Number.isInteger(promedio)) return res.status(409).send();
    USERS_BBDD.push({
        id, nombres, apellidos, matricula, promedio
    })
    const user2 = USERS_BBDD.find((user) => user.id == id);
    res.status(201);
    return res.send(user2);
    return res.status(201).send;
});

//modifica los datos de un alumno en específico
expressApp.put('/alumnos/:id', (req, res) =>{
    const { id } = req.params;
    const {nombres, apellidos, matricula, promedio } = req.body;
    const user = USERS_BBDD.find((user) => user.id == id);
    if(!id || !nombres  || !apellidos || !matricula || !promedio) {res.status(400); return res.send(user);}
    if(!user) return res.status(404).send();
    //if(!contienenum(nombres)) return res.status(409).send();
    //if(comprobar(apellidos)) return res.status(409).send();
    //if(comprobar(matricula)) return res.status(409).send();
    //if(!Number.isInteger(promedio)) return res.status(409).send();
    user.nombres = nombres;
    user.apellidos = apellidos;
    user.matricula = matricula;
    user.promedio = promedio;
    const user2 = USERS_BBDD.find((user) => user.id == id);
    return res.send(user2);
});

// function contienenum(prueba){
//     const ciclo = prueba.splice();
//     for(i=0;i<ciclo.length;i++){
//         if(ciclo[i]==1){return true;}
//         if(ciclo[i]==2){return true;}
//         if(ciclo[i]==3){return true;}
//         if(ciclo[i]==4){return true;}
//         if(ciclo[i]==5){return true;}
//         if(ciclo[i]==6){return true;}
//         if(ciclo[i]==7){return true;}
//         if(ciclo[i]==8){return true;}
//         if(ciclo[i]==9){return true;}
//         if(ciclo[i]==0){return true;}
//         console.log(ciclo[i]);
//     }
//     return false;
// }

//elimina los datos un alumno en específico
expressApp.delete('/alumnos/:id', (req, res) =>{
    const { id } = req.params;
    const userIndex = USERS_BBDD.findIndex((user) => user.id == id);
    if(userIndex === -1) res.status(404).send();
    USERS_BBDD.splice(userIndex,1);
    return res.send();
});

expressApp.delete('/alumnos', (req, res) =>{
    res.status(405).send();
})


//Obtiene una lista de los maestros
expressApp.get("/profesores/:id", (req, res) =>{
    const { id } = req.params;
    const maestros = MAESTROS_BBDD.find((maestros) => maestros.id == id);
    if(!maestros) return res.status(404).send();
    return res.send(maestros);
});

//obtiene los datos de un maestro en específico
expressApp.get('/profesores', (req, res) =>{
    const { id } = req.params;
    const maestros = MAESTROS_BBDD;
    if(!maestros) return res.status(404).send();
    return res.send(maestros);
});

//agrega los datos de un maestro
expressApp.post('/profesores', (req, res) =>{
    const { id, numeroEmpleado, nombres, apellidos, horasClase } = req.body;
    if(!id || !numeroEmpleado ||!nombres || !apellidos || !horasClase) {
        var datos = [];
        datos.push({
            "id":id,
            "numeroEmpleado": numeroEmpleado,
            "nombres":nombres,
            "apellidos": apellidos,
            "horasClase": horasClase,
        })
        res.status(400); return res.send(datos);
    }
    const maestros = MAESTROS_BBDD.find((maestros) => maestros.id == id);
    if(maestros) return res.status(409).send();
    //if(!Number.isInteger(id)) return res.status(409).send();
    //if(!Number.isInteger(numeroempleado)) return res.status(409).send();
    //if(comprobar(nombres)) return res.status(409).send();
    //if(comprobar(apellidos)) return res.status(409).send();
    //if(!Number.isInteger(horasClase)) return res.status(409).send();
    MAESTROS_BBDD.push({
        id, numeroEmpleado, nombres, apellidos, horasClase
    })
    const maestros2 = MAESTROS_BBDD.find((maestros) => maestros.id == id);
    res.status(201);
    return res.send(maestros2);
    //return res.send();
});

//modifica los datos de un maestro en específico
expressApp.put('/profesores/:id', (req, res) =>{
    const { id } = req.params;
    const {numeroEmpleado, nombres, apellidos, horasClase} = req.body;
    const maestros = MAESTROS_BBDD.find((maestros) => maestros.id == id);
    if(!numeroEmpleado ||!nombres || !apellidos || !horasClase){ res.status(400); return res.send(maestros);};
    if(!maestros) return res.status(404).send();
    maestros.numeroEmpleado = numeroEmpleado;
    maestros.nombres = nombres;
    maestros.apellidos = apellidos;
    maestros.horasClase = horasClase;
    const maestros2 = MAESTROS_BBDD.find((maestros) => maestros.id == id);
    return res.send(maestros2);
});

//elimina los datos un maestro en específico
expressApp.delete('/profesores/:id', (req, res) =>{
    const { id } = req.params;
    const maestrosIndex = MAESTROS_BBDD.findIndex((maestros) => maestros.id == id);
    if(maestrosIndex === -1) res.status(404).send();
    MAESTROS_BBDD.splice(maestrosIndex,1);
    return res.send();
});

expressApp.delete('/profesores', (req, res) =>{
    res.status(405).send();
})

expressApp.listen(PORT, () => 
    console.log('servidor levantado en el puerto '+PORT)
);

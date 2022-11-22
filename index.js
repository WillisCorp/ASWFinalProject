import express from 'express';
import { USERS_BBDD } from './bbdd.js';
import { MAESTROS_BBDD } from './bbddMaestros.js';

const PORT = 80;
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
    const base = [1,2,3,4,5,6,7,8,9,0]
    if(!id || !nombres  || !apellidos || !matricula || !promedio) return res.status(400).send();
    const user = USERS_BBDD.find((user) => user.id == id);
    if(user) return res.status(409).send();
    if(!Number.isInteger(id)) return res.status(409).send();
    //if(nombres.find()) return res.status(409).send();
    if(!Number.isInteger(promedio)) return res.status(409).send();
    USERS_BBDD.push({
        id, nombres, apellidos, matricula, promedio
    })
    return res.send();
});

//modifica los datos de un alumno en específico
expressApp.put('/alumnos/:id', (req, res) =>{
    const { id } = req.params;
    const {nombres, apellidos, matricula, promedio } = req.body;
    if(!id || !nombres  || !apellidos || !matricula || !promedio) return res.status(400).send();
    const user = USERS_BBDD.find((user) => user.id == id);
    if(!user) return res.status(404).send();
    //if(comprobar(nombres)) return res.status(409).send();
    //if(comprobar(apellidos)) return res.status(409).send();
    //if(comprobar(matricula)) return res.status(409).send();
    if(!Number.isInteger(promedio)) return res.status(409).send();
    user.nombres = nombres;
    user.apellidos = apellidos;
    user.matricula = matricula;
    user.promedio = promedio;
    return res.send();
});

//elimina los datos un alumno en específico
expressApp.delete('/alumnos/:id', (req, res) =>{
    const { id } = req.params;
    const userIndex = USERS_BBDD.findIndex((user) => user.id == id);
    if(userIndex === -1) res.status(404).send();
    USERS_BBDD.splice(userIndex,1);
    return res.send();
});

//Obtiene una lista de los maestros
expressApp.get("/maestros/:id", (req, res) =>{
    const { id } = req.params;
    const maestros = MAESTROS_BBDD.find((maestros) => maestros.id == id);
    if(!maestros) return res.status(404).send();
    return res.send(maestros);
});

//obtiene los datos de un maestro en específico
expressApp.get('/maestros', (req, res) =>{
    const { id } = req.params;
    const maestros = MAESTROS_BBDD;
    if(!maestros) return res.status(404).send();
    return res.send(maestros);
});

//agrega los datos de un maestro
expressApp.post('/maestros', (req, res) =>{
    const { id, numeroempleado, nombres, apellidos, horasClase } = req.body;
    if(!id || !numeroempleado ||!nombres || !apellidos || !horasClase) return res.status(400).send();
    const maestros = MAESTROS_BBDD.find((maestros) => maestros.id == id);
    if(maestros) return res.status(409).send();
    if(!Number.isInteger(id)) return res.status(409).send();
    if(!Number.isInteger(numeroempleado)) return res.status(409).send();
    //if(comprobar(nombres)) return res.status(409).send();
    //if(comprobar(apellidos)) return res.status(409).send();
    if(!Number.isInteger(horasClase)) return res.status(409).send();
    MAESTROS_BBDD.push({
        id, numeroempleado, nombres, apellidos, horasClase
    })
    return res.send();
});

//modifica los datos de un maestro en específico
expressApp.put('/maestros/:id', (req, res) =>{
    const { id } = req.params;
    const {numeroempleado, nombres, apellidos, horasClase} = req.body;
    if(!numeroempleado ||!nombres || !apellidos || !horasClase) return res.status(400).send();
    const maestros = MAESTROS_BBDD.find((maestros) => maestros.id == id);
    if(!maestros) return res.status(404).send();
    maestros.numeroempleado = numeroempleado;
    maestros.nombres = nombres;
    maestros.apellidos = apellidos;
    maestros.horasClase = horasClase;
    return res.send();
});

//elimina los datos un maestro en específico
expressApp.delete('/alumnos/:id', (req, res) =>{
    const { id } = req.params;
    const maestrosIndex = MAESTROS_BBDD.findIndex((maestros) => maestros.id == id);
    if(maestrosIndex === -1) res.status(404).send();
    MAESTROS_BBDD.splice(maestrosIndex,1);
    return res.send();
});

expressApp.listen(PORT, () => 
    console.log('servidor levantado en el puerto $(PORT)')
);


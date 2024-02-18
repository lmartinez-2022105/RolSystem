import {
    connect
} from './configs/mongo.js'
import {
    initServer
} from './configs/app.js'
import Subject from './src/subjects/subjects.model.js'
import User from './src/users/user.model.js'

async function createSubjectIfNotExists() {
    try {
        // Buscar si ya existe una asignatura con el mismo nombre
        const existingSubject = await Subject.findOne({
            name: 'Default'
        });

        // Si ya existe una asignatura con ese nombre, no hacemos nada
        if (existingSubject) {
            console.log('La asignatura ya existe en la base de datos.');
            return;
        }

        // Si no existe una asignatura con ese nombre, creamos la asignatura
        await Subject.create({
            name: 'Default',
            description: 'Default'
        });

        console.log('Asignatura creada correctamente');
    } catch (error) {
        console.error('Error al crear la asignatura:', error);
    }
}


createSubjectIfNotExists()

connect()
initServer()
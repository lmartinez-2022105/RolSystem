'use strict'

import {Router} from 'express'
import { test, add, deletSub, update} from './subjects.controller.js'
import { isProfessor, validateJwt, isLogged } from '../middlewares/validate-jwt.js'


const api = Router()

api.get('/test',[validateJwt, isProfessor], test)
api.post('/add', [validateJwt, isProfessor],add)
api.put('/update/:id',[validateJwt, isProfessor], update)
api.delete('/delete/:id',[validateJwt, isProfessor], deletSub)

export default api
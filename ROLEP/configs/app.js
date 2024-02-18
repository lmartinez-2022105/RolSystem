'use strict'

import express from "express";
import morgan from "morgan";
import cors from 'cors'
import {config} from 'dotenv'
import userRoutes from '../src/users/user.routes.js'
import subjectRoutes from "../src/subjects/subject.routes.js"

//Configuraciones
const app = express()
config()
const port = process.env.PORT

//Config Server
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

//Rutas
app.use(userRoutes)
app.use('/class',subjectRoutes)

//Levatar Server
export const initServer = () =>{
    app.listen(port)
    console.log(`Server is running in port ${port}`)
}


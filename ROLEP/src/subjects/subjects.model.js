import { Schema, model } from "mongoose";

const subjectSchema = Schema({
    name:{
        type: String,
        required: true,
        default: 'Default'
    },
    description:{
        type: String,
        required: true,
        default: 'description default'
    }

})

export default model('subject', subjectSchema)

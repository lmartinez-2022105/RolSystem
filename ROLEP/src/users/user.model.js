import {Schema, model} from "mongoose";

const userSchema = Schema({
    name:{
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
    },
    username:{
        type: String,
        unique: true,
        lowecase: true,
        required: true
    },
    password:{
        type: String,
        required: true,
        minlegth: [5]
    },
    role:{
        type: String,
        upparcase: true,
        enum: ['STUDENT','PROFESSOR'],
        required: true,
        default: 'STUDENT'
    },
    subject1:{
        type: Schema.ObjectId,
        ref: 'subject',
    },
    subject2:{
        type: Schema.ObjectId,
        ref: 'subject',
    },
    subject3:{
        type: Schema.ObjectId,
        ref: 'subject',
    },
})

export default model('user', userSchema)

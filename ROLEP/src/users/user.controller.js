'use strict'

import User from './user.model.js'
import {
    encrypt,
    checkPassword,
    checkUpdate
} from '../../util/validator.js'
import {
    generateJwt
} from '../../util/jwt.js'
import mongoose from 'mongoose'

export const test = (req, res) => {
    return res.send({
        message: 'Gato'
    })
}

export const register = async (req, res) => {
    try {
        let data = req.body
        data.password = await encrypt(data.password)
        let user = new User(data)
        await user.save()
        return res.send({
            message: 'Refistered succesfully'
        })
    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: 'Error registering user',
            error
        })
    }
}

export const login = async (req, res) => {
    try {
        let {
            username,
            password
        } = req.body
        let user = await User.findOne({
            username
        })
        if (user && await checkPassword(password, user.password)) {
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name,
                role: user.role
            }
            let token = await generateJwt(loggedUser)
            return res.send({
                message: `Welcome ${user.name}`,
                loggedUser,
                token
            })
        }
        return res.status(404).send({
            message: 'Invalid credentials'
        })
    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: 'Failed to login'
        })
    }
}

export const update = async (req, res) => {
    try {
        let {
            id
        } = req.params
        let data = req.body
        let update = checkUpdate(data, id)
        if (!update) return res.status(400).send({
            message: 'Have sumbmitted some data that cannot be updated or missing data'
        })
        let updatedUser = await User.findOneAndUpdate({
                _id: id
            },
            data, {
                new: true
            }
        )
        if (!updatedUser) return res.status(401).send({
            message: 'User not found and not updated'
        })
        return res.send({
            message: 'Updated user',
            updatedUser
        })
    } catch (error) {
        console.error(error)
        if (err.keyValue.username) return res.status(400).send({
            message: `Username ${err.keyValue.username} is already taken`
        })
        return res.status(500).send({
            message: 'Error updating account'
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        let {
            id
        } = req.params
        let user = User.findOne({
            _id: id
        })
        if (id !== user._id && user.role == 'STUDENT') return res.send({
            message: 'You cannot delete an user that is not you'
        })
        let deletedUser = await User.findOneAndDelete({
            _id: id
        })
        if (!deletedUser) return res.status(404).send({
            message: 'Account not found and not deleted'
        })
        return res.send({
            message: `Account with username ${deletedUser.username} deleted successfully`
        })
    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: 'Error deleting account'
        })
    }
}

export const search = async (req, res) => {
    try {
        //Obtener el parámetro de búsqueda
        let {
            search
        } = req.body
        //Buscar
        let subjects = await User.find({
            username: search
        }).populate('subject1', ['name', 'description'], 'subject2', ['name', 'description'], 'subject3', ['name', 'description'])
        //Validar la respuesta
        if (subjects.length == 0) return res.status(404).send({
            message: 'Subject not found'
        })
        //Responder si todo sale bien
        return res.send({
            message: 'Subjects found',
            subjects
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({
            message: 'Error searching subjects'
        })
    }
}
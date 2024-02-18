'use strict'

import { checkUpdate } from "../../util/validator.js"
import Subject from "./subjects.model.js"

export const test = (req, res)=>{
    return res.send('All subjects')
}

export const add = async(req, res)=>{
   try {
    let data = req.body
    let subject = new Subject(data)
    await subject.save()
    return res.send({message: 'Subject added succesfully'})
   } catch (error) {
    console.error(error)
    return res.status(500).send({message: 'Error adding subject', error})
   }
}

export const update = async(req, res)=>{
    try {
        let {id} = req.params
        let data = req.body
        let update = checkUpdate(data, id)
        if(!update) return res.status(400).send({
            message: 'Have sumbmitted some data that cannot be updated or missing data'
        })
        let updatedSubject = await Subject.findOneAndUpdate(
            {_id:id},
            data,
            {new: true}
        )
        if(!updatedSubject) return res.status(401).send({message: 'Subject not found and not updated'})
        return res.send({message: 'Updated subject', updatedSubject})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error updating subject'})
    }
}

export const deletSub = async (req, res)=>{
    try {
        let {id} = req.params
        let deletedSubject = await Subject.findOneAndDelete({_id:id})
        if (!deletedSubject) return res.status(404).send({
            message: 'Subject not found and not deleted'
        })
        return res.send({
            message: `Subject with name ${deletedSubject.name} deleted successfully`
        })
    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: 'Error deleting Subject'
        })
    }
}




   
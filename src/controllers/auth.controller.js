import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { createAccesToken } from "../libs/jwt.js"
import { now } from "mongoose"

export const register = async (req, res) => {
    const { username, email, password } = req.body
    try {
        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = new User({
            username,
            email,
            password: passwordHash
        })
        const userSaved = await newUser.save()
        const token = await createAccesToken({ id: userSaved._id })
        res.cookie("token", token)
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const login = async (req, res) => {
    const {email, password} =req.body
    try {
        const userFound = await User.findOne({email})
        if(!userFound) return res.status(404).json({message: 'No se encontro el usuario'})
        
        const isMatch = await bcrypt.compare(password, userFound.password)
        if(!isMatch) return res.status(400).json({message: 'Contraseña incorrecta'})

        const token = await createAccesToken({id: userFound._id})
        res.cookie("token", token)
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        })
    } catch (error) {
        
    }
}

export const logout = async (req,res) =>{
    res.cookie("token", "", {
        expires: new Date(0)
    })
    return res.sendStatus(200)
}

export const profile = async(req, res)=>{
    const userFound = await User.findById(req.user.id)
    if(!userFound) return res.status(404).json({message: 'usuario no encontrado'})
    
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email
    })

}
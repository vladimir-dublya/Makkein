import { getInfo, loginAdmin, regNewAdmin } from "../models/userModels.js"
import jwt from "jsonwebtoken"


export const createUser = (req, res) => {
    try {
        const data = req.body
        regNewAdmin(data, (err, results) => {
            if (err) {
                res.status(400).json({
                    message: err
                })
            }
            else {
                res.status(201).json(results)
            }
        })
    }
    catch (err) {
        res.status(400).json({
            message: 'error create'
        })
    }
}


export const getUserInfo = (req, res) => {
    
    const data = req.body

    try {
        const decoded = jwt.verify(data.token, 'Y5u2g2aG5H2uVFe9pHy9')

        getInfo(decoded, (err,results) => {
            if(err){
                res.send(401).json(err)
            }
            else{

                if(results === 'Не нашел тебя'){
                    return res.status(404).json({ message: results })
                }
                else{ res.json(results) }
            }
        })
    }
    catch (err) {
        return res.status(401).json({
            message: 'Не валидный токен'
        })
    }
}


export const login = async (req, res) => {
    try {
        const data = req.body
        await loginAdmin(data, (err, results) => {
            if (err === 'Неверный login или password') {
                res.status(401).json('Error login')
            }
            else {
                res.json(results)
            }
        })
    }
    catch (err) {
        console.log(err)
        res.status(401).json('Error login')
    }
}






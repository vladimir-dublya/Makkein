import jwt from "jsonwebtoken"
import { secretKey } from '../secretKey.js'
export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

    if(token){
        try{
            const decoded = jwt.verify(token, secretKey)
            req.userId = decoded.id 
            next()
        }
        catch(err){
            return res.status(403).json({ message: 'Доступа нет' })
        }
    }
    else{
        return res.status(403).json({ message: 'Доступа нет' })
    }
}


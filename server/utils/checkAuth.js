import jwt from "jsonwebtoken"

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

    if(token){
        try{
            const decoded = jwt.verify(token, 'Y5u2g2aG5H2uVFe9pHy9')
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


import db from '../config/config.js'
import bcrypt from 'bcrypt'
import  jwt  from 'jsonwebtoken'


// export const createNewUser = async (data, result) => {
//     try {
//         db.query('INSERT INTO users SET ?', data, (err, results) => {
//             if (err) {
//                 return result(err, null)
//             }
//             else {
//                 return result(null, results)
//             }
//         })
//     }
//     catch (err) {
//         console.log(err)
//     }
// }


export const regNewAdmin = async (data, result) => {
    const password = data.password ? data.password : null;
    const salt = await bcrypt.genSalt(12)

    const newData = {
        login: data.login,
        passwordHash: password ? await bcrypt.hash(password, salt) : null,
        role: data.role ? data.role : null
    }

    try {
        db.query('INSERT INTO users SET ?', [newData], (err, results) => {
            if (err) {
                if (err.sqlMessage.indexOf('login') !== -1) {
                    return result('login такой есть', null)
                }
    
            }
            else {
                try {
                    getInfo({ id: results.insertId }, async (err, results) => {
                        const token = jwt.sign(
                            {
                                id: results.id,
                                role: results.role
                            },
                            'Y5u2g2aG5H2uVFe9pHy9'
                        )
                        result(null, { token: token, data: results })
                    })

                }
                catch (err) {
                    result(err, null)
                }

            }
        })
    }
    catch (err) {
        console.log(err)
    }
}


export const getInfo = async (data, result) => {
    try {
        db.query('SELECT * FROM users WHERE id = ?', data.id, (err, results) => {
            if(err){
                return result(err, null)
            }
            else{
                if(results.length === 0){
                    return result(null, 'Пользователя не нашел')
                }

                let { passwordHash, ...user } = results.pop()
                return result(null, user)
            }
        })
    }
    catch(err) {
            console.log(err)  
    }
}


export const loginAdmin = async(data, result) => {
    try{
        db.query('SELECT * FROM users WHERE login = ?', data.login, async (err, results) => {
            if(result.length === 0){
                result({ message: 'Неверный login или password'}, null)
            }
            else{
                const validPass = await bcrypt.compare(data.password, results[0].passwordHash)

                if(!validPass){
                    return result('Неверный login или password', null)
                }

                const token = jwt.sign({id: results[0].id, role: results[0].role},
                '54d5245296e6746882081a9c6aafcdf25e361cb6')

                let {passwordHash, ...user} = results.pop()
                result(null, {token: token, data: user})
                
            }
        })
    }
    catch(err){
        console.log(err)
        result('Неверный login или password', null)
    }
}
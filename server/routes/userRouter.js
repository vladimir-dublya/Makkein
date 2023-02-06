
import express from 'express'
import { createUser, getUserInfo, login } from '../controllers/userControllers.js'

const router = express.Router()


router.route('/').post(createUser)
router.route('/me').post(getUserInfo)
router.route('/login').post(login)


export default router
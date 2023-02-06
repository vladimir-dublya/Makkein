
import express from 'express'
import { 
    createNews,
    deleteNews,
    getNews,
    getOneNews,
    getThreeNewsdisplay,
    updateNews
} from '../controllers/newsController.js'


import checkAuth from '../utils/checkAuth.js'
import checkRole from '../utils/checkRole.js'

const router = express.Router()

router
    .route('/')
    .post(checkAuth, checkRole, createNews)
    .get(getNews)
    .put(checkAuth, checkRole, updateNews)

router
.route('/lastnews')
    .get(getThreeNewsdisplay)

router
    .route('/some/:id')
    .delete(checkAuth, checkRole, deleteNews)
    .get(getOneNews)



export default router






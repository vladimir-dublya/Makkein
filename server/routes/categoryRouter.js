
import express from 'express'
import { getAllAuthors } from '../controllers/bookController.js'
import { 
    createCategories,
    deleteCategories,
    getCategories,
    getOneCategory,
    updateCategories
} from '../controllers/categoriesController.js'


import checkAuth from '../utils/checkAuth.js'
import checkRole from '../utils/checkRole.js'

const router = express.Router()

router
    .route('/')
    .post(checkAuth, checkRole, createCategories)
    .get(getCategories)
    .put(checkAuth, checkRole, updateCategories)

router
    .route('/some/:id')
    .delete(checkAuth, checkRole, deleteCategories)
    .get(getOneCategory)



export default router






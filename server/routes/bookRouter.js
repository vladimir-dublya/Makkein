import express from 'express'
import {
    createBook,
    currentPage,
    deleteBook,
    getAllAuthors,
    getBooks,
    getFilterController,
    getOneBook,
    updateBook,
} from '../controllers/bookController.js'

import checkAuth from '../utils/checkAuth.js'
import checkRole from '../utils/checkRole.js'

const router = express.Router()

router
    .route('/')
    .post(checkAuth, checkRole, createBook)
    .get(getBooks)
    .put(checkAuth, checkRole, updateBook)
router
    .route('/author')
    .get(getAllAuthors)

router
    .route('/some/:id')
    .delete(checkAuth, checkRole, deleteBook)
    .get(getOneBook)

router
    .route('/search')
    .get(getFilterController)

router
    .route('/addBook')
    .post(createBook)

export default router






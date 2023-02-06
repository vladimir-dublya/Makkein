import { query } from 'express'
import db from '../config/config.js'
import {
    createNewBook,
    deleteSomeBook,
    getAllAuthor,
    getAllBooks,
    getCount,
    getFilterModel,
    getSomeBook,
    updateSomeBook,
} from "../models/bookModels.js"


export const createBook = (req, res) => {
    try {
        const data = req.body
        createNewBook(data, (err, results) => {
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


export const getBooks = (req, res) => {
    try {
        const currantPage = req.query.currantPage
        const data = (currantPage - 1) * Number(process.env.LIMIT)
        // console.log(data)

        getAllBooks(data, (err, results) => {
            if (err) {
                res.status(400).json({
                    message: err
                })
            }
            else {
                res.status(200).json(results)
            }
        })
    }
    catch (err) {
        res.status(400).json({
            message: 'Error get'
        })
    }
}

export const getAllAuthors = (req, res) => {
    try {
        const data = req.body
        getAllAuthor(data, (err, results) => {
            if (err) {
                res.status(400).json({
                    message: err
                })
            }
            else {
                res.status(200).json(results)
            }
        })
    }
    catch (err) {
        res.status(400).json({
            message: 'Error get all authors'
        })
    }
}


export const currentPage = (req, res) => {
    try {
        const data = req.body
        getCount(data, (err, results) => {
            if (err) {
                res.status(400).json({
                    message: err
                })
            }
            else {
                res.status(200).json(results)
            }
        })
    }
    catch (err) {
        res.status(400).json({
            message: 'Error current page'
        })
    }
}


export const getOneBook = (req, res) => {
    try {
        const data = req.params.id

        getSomeBook(data, (err, results) => {
            if (err) {
                res.status(400).json({
                    message: err
                })
            }
            else {
                res.status(200).json(results)
            }
        })
    }
    catch (err) {
        res.status(400).json({
            message: 'Error get'
        })
    }
}


export const getFilterController = (req, res) => {
    try {
        const { name, createdate, category, author } = req.query
        let data = req.query
        
        getFilterModel(data, async (err, results) => {
            if (err) {
                res.status(400).json({
                    message: err
                })
            }
            else {
                res.status(200).json(results)
            }
        })

    }
    catch (err) {
        res.status(400).json({ message: 'error filter' })
    }
}


export const updateBook = (req, res) => {
    try {
        const data = req.body
        updateSomeBook(data, (err, results) => {
            if (err) {
                res.status(400).json({
                    message: err
                })
            } else {
                res.status(200).json(results)
            }
        })
    } catch (err) {
        res.status(400).json({
            message: 'Error put'
        })
    }
}


export const deleteBook = (req, res) => {
    try {
        const data = req.params.id
        deleteSomeBook(data, (err, results) => {
            if (err) {
                res.status(400).json({
                    message: err
                })
            } else {
                res.status(200).json(results)
            }
        })
    } catch (err) {
        res.status(400).json({
            message: 'Error delete'
        })
    }
}

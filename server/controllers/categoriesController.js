import { 
    createNewCategories,
    deleteSomeCategory,
    getAllCategorise,
    getSomeCategory,
    updateSomeCategory,
} from "../models/categoriesModel.js"


export const createCategories = (req, res) => {
    try {
        const data = req.body
        createNewCategories(data, (err, results) => {
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


export const getCategories = (req, res) => {
    try {
        const data = req.body

        getAllCategorise(data, (err, results) => {
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


export const getOneCategory = (req, res) => {
    try {
        const data = req.params.id

        getSomeCategory(data, (err, results) => {
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


export const updateCategories = (req, res) => {
	try {
		const data = req.body
		updateSomeCategory(data, (err, results) => {
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


export const deleteCategories = (req, res) => {
	try {
		const data = req.params.id
        console.log(data)
		deleteSomeCategory(data, (err, results) => {
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






































































import db from '../config/config.js'



export const createNewCategories = async (data, result) => {
	try {
		db.query('INSERT INTO categories SET ?', data, (err, results) => {
			if (err) {
				return result(err, null)
			}
			else {
				return result(null, results)
			}
		})
	}
	catch (err) {
		console.log(err)
	}
}


export const getAllCategorise = async (data, result) => {
	try {
		db.query('SELECT * FROM categories', (err, results) => {
			if (err) {
				return result(err, null)
			}
			else {
				return result(null, results)
			}
		})
	}
	catch (err) {
		console.log(err)
	}
}


export const getSomeCategory = async (data, result) => {
	try {
		db.query('SELECT * FROM categories WHERE id = ?', data, (err, results) => {
			if (err) {
				return result(err, null)
			} else {
				return result(null, results)
			}
		})
	} catch (err) {
		console.log(err)
	}
}


export const updateSomeCategory = async (data, result) => {
	try {
		db.query(
			'UPDATE categories SET name = ? WHERE id = ?',
			[data.name, data.id],
			(err, results) => {
				if (err) {
					return result(err, null)
				} else {
					return result(null, results)
				}
			}
		)
	} catch (err) {
		console.log(err)
	}
}


export const deleteSomeCategory = async (data, result) => {
	try {
		db.query('DELETE FROM categories WHERE id = ?', data, (err, results) => {
			if (err) {
				return result(err, null)
			} else {
				return result(null, results)
			}
		})
	} catch (err) {
		console.log(err)
	}
}

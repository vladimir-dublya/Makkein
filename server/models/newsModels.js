
import db from "../config/config.js";

export const createNewNews = async (data, result) => {
	try {
		db.query('INSERT INTO news SET ?', data, (err, results) => {
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

// SELECT * FROM news WHERE id>0 ORDER BY id LIMIT 3

export const getThreeNews = async (data, result) => {
	try {
		db.query('SELECT * FROM news ORDER BY id DESC LIMIT 3', data, (err, results) => {
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


export const getAllNews = async (data, result) => {
	try {
		db.query('SELECT * FROM news', (err, results) => {
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


export const getSomeNews = async (data, result) => {
	try {
		db.query('SELECT * FROM news WHERE id = ?', data, (err, results) => {
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


export const updateSomeNews = async (data, result) => {

	const {id, ...rest } = data
	try {
		db.query(
			'UPDATE news SET ? WHERE id = ?',
			[rest, id],
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


export const deleteSomeNews = async (data, result) => {
	try {
		db.query('DELETE FROM news WHERE id = ?', data, (err, results) => {
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

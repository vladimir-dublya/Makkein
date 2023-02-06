
import db from '../config/config.js'
// import { getBooks } from '../controllers/bookController.js'


export const createNewBook = async (data, result) => {
	try {
		db.query('INSERT INTO books SET ?', data, (err, results) => {
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


export const getAllBooks = async (data, result) => {
	try {
		db.query(`SELECT * FROM books ORDER BY id LIMIT ${Number(process.env.LIMIT)} OFFSET ${data}`, (err, results) => {
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


export const getAllAuthor = async (data, result) => {
	try {
		db.query('SELECT books.author FROM books GROUP BY author', data, (err, results) => {
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


export const getCount = async (data, result) => {
	try {
		db.query('SELECT COUNT(id) AS count FROM books', data, (err, results) => {
			if (err) {
				return result(err, null)
			}
			else {
				const count = Math.ceil(results.pop().count / process.env.LIMIT);
				let arr = []
				for(let i = 0; i<count; i++){
					arr.push(i+1)
				}
				return result(null, arr)
			}
		})
	}
	catch (err) {
		console.log(err)
	}
}


export const getSomeBook = async (data, result) => {
	try {
		db.query('SELECT * FROM books WHERE id = ?', data, (err, results) => {
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


export const getFilterModel = async(data, result) => {
	console.table(data.page)
	try{
		if(data.name || data.categoryName || data.author || data.createdate){
			console.log('if')
			db.query(`SELECT books.*, categories.name AS categoryName FROM books JOIN categories ON books.category = categories.id WHERE (books.createDate  LIKE "%${data.createdate
			}%" OR books.name LIKE "%${data.name}%" OR categories.name LIKE "%${data.categoryName}%" OR author LIKE "%${data.author}%") ORDER BY name LIMIT ${Number(process.env.LIMIT)} OFFSET ${data.page}`, 
			data, (err, results) => {
				if(err){
					return result(err, null)
				}
				else{
					
					return result(null, results)
				}
			})
		}
		else{
			console.log('else')
			db.query(`SELECT books.*, categories.name AS categoryName FROM books JOIN categories ON books.category = categories.id ORDER BY books.id LIMIT ${Number(process.env.LIMIT)} OFFSET ${data.page}`, 
			data, async (err, results) => {
				if(err){
					return result(err, null)
				}
				else{
					// await getCount().then((pages) => {
					// 	console.log(pages)
					// })
					return result(null, results)
				}
			})
		}
	}
	catch(err){
		console.log(err)
	}
}
	


export const updateSomeBook = async (data, result) => {
	const {id, ...rest } = data
	try {
		db.query(
			'UPDATE books SET ? WHERE id = ?',
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


export const deleteSomeBook = async (data, result) => {
	try {
		db.query('DELETE FROM books WHERE id = ?', data, (err, results) => {
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





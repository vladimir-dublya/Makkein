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
		let pages; 
		getCount(data, (err, result) => {
				pages = result	;
		})
			db.query(`SELECT * FROM books ORDER BY id LIMIT 4 OFFSET ${data}`, (err, results) => {
			if (err) {
				return result(err, null)
			}
			else {
				return result(null, {books: results, pages})
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

export const getCount = async (data, result) => {
	try {

		let keys = Object.keys(data).filter(key => key !== 'page').filter(key => key !== '            ');

			let obj = {...data
			}

			for (let key in data) {
				if(keys.length > 0) {
					if(key !== keys[keys.length - 1] && key !== 'page') {
						obj = {...obj,
							[key]: `"%${obj[key]}%"` + ' AND '
						} 
					} else {
						obj = {...obj,
							[key]: `"%${obj[key]}%"`
						}
					}
				}
			}
		let str = Object.keys(data).length > 1 ? `SELECT COUNT(books.id) FROM books JOIN categories ON books.category = categories.id WHERE (${obj.name ? `books.name LIKE ${obj.name}` : ''}${obj.createdate ? `books.createDate LIKE ${obj.createdate}` : ''}${obj.categoryName ? `categories.name LIKE ${obj.categoryName}` : ''}${obj.author 
			? `author LIKE ${obj.author}` : ''})` : 'SELECT COUNT(id) AS count FROM books'
		db.query(
			str
			, data, (err, results) => {
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



export const getFilterModel = async(data, result) => {
	console.table(data.page)
	try{
		if(data.name || data.categoryName || data.author || data.createdate){
			console.log('if')
				let pages; 
			getCount(data, (err, result) => {
					pages = result	;
			})

			

			
			let keys = Object.keys(data).filter(key => key !== 'page').filter(key => key !== '            ');

			let obj = {...data
			}

			for (let key in data) {
				if(keys.length > 0) {
					if(key !== keys[keys.length - 1] && key !== 'page') {
						obj = {...obj,
							[key]: `"%${obj[key]}%"` + ' AND '
						} 
					} else {
						obj = {...obj,
							[key]: `"%${obj[key]}%"`
						}
					}
				}
			}


	
			db.query(`SELECT books.* FROM books JOIN categories ON books.category = categories.id WHERE (${obj.name ? `books.name LIKE ${obj.name}` : ''}${obj.createdate ? `books.createDate LIKE ${obj.createdate}` : ''}${obj.categoryName ? `categories.id LIKE ${obj.categoryName}` : ''}${obj.author 
					? `author LIKE ${obj.author}` : ''}) ORDER BY name LIMIT ${Number(process.env.LIMIT)} OFFSET ${pages > 1 ? data.page : 0}`,
			data, (err, results) => {
				if(err){
					return result(err, null)
				}
				else{
					return result(null, {books: results, pages})
				}
			})
		}
		else{
			console.log('else')
			db.query(`SELECT books.*, categories.name AS categoryName FROM books JOIN categories ON books.category = categories.id ORDER BY books.id LIMIT $1 OFFSET $2`, [Number(process.env.LIMIT), data.page], 
			data, async (err, results) => {
				if(err){
					return result(err, null)
				}
				else{
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





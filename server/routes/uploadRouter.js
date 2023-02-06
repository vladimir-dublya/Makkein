import express from 'express'
import multer from 'multer'
import { v1 as uuidv4 } from 'uuid'

const router = express.Router()


const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, 'uploads')
	},
	filename: async (_, file, cb) => {
		const fileName = uuidv4().toString() + file.originalname
		cb(null, fileName)
	}
})

const upload = multer({ storage })

router
	.route('/')
	.post(upload.single('image'), (req, res) => {
		res.json({
			url: `${process.env.MAIN_PATH}/uploads/${req.file.filename}`
		})
	})

export default router
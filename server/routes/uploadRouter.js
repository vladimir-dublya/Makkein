import express from 'express'
import multer from 'multer'
import { v1 as uuidv4 } from 'uuid'

const router = express.Router()


const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, 'uploads')
	},
	filename: async (_, file, cb) => {
        const fileName = uuidv4().toString() + '.' + file.originalname.split('.').pop().toString()
        cb(null, fileName)
    }
})

const types = ['image/jpeg', 'image/png', 'image/jpg'];

const fileFilter = (req, file, cb) => {
	if (types.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}


const upload = await multer({ storage, fileFilter })

router
	.route('/')
	.post(upload.single('file'), async (req, res) => {
		res.json({
			url: `${process.env.MAIN_PATH}/uploads/${req.file.filename}`
		})
})
export default router

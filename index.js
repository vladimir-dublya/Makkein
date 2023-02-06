import express from 'express';
import dotenv from 'dotenv'
import path from 'path'
import cors from 'cors'

import bookRouter from './server/routes/bookRouter.js'
import userRouter from './server/routes/userRouter.js'
import categoryRouter from './server/routes/categoryRouter.js'
import newsRouter from './server/routes/newsRouter.js'
import uploadRouter from './server/routes/uploadRouter.js'

dotenv.config()
const app = express()
app.use(express.json())

const __dirname = path.resolve()
app.use('/api/uploads', express.static(path.join(__dirname, '/uploads/')))
app.use(cors())

app.use('/api/book', bookRouter)
app.use('/api/user', userRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/news', newsRouter )
app.use('/api/upload', uploadRouter)


const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log(`app listen port ${port}`)
})














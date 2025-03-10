import express from 'express'
import morgan from 'morgan'
import AuthRoutes from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'


const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173/'
}
))

//rutas
app.use('/auth', AuthRoutes)
export default app;
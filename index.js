import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import { config } from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json' assert { type: 'json' }
import trainRoute from './routes/trainRoute.js'
import userRoute from './routes/userRoute.js'
import authRoute from './routes/authRoute.js'
import trainStationRouter from './controllers/trainStationRouter.js';


const app = express()
const PORT = 8080
config()

mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
).then(() => {
    console.log('Connected to the database')
}).catch((error) => {
    console.error('Error connecting to the database: ', error)
})

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(cors());
app.use('/api/train', trainRoute);
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/trainstations', trainStation)

app.use((req, res) => {
    res.status(404).json({ message: `API not found at ${req.url}` })
})

app.listen(8080, () => {
    console.log(`Server started on port ${PORT}. API Documentation: http://localhost:${PORT}/api-docs/`)
})

// export default app
import express from 'express'
import { authMiddleware } from './middlewares/authMiddleware'
import router from './Routes/sellingRoutes'
const PORT = process.env.PORT || 3333

const app = express()

app.use(express.json())
app.use(authMiddleware)
app.use('/', router)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

import dotenv from 'dotenv'

dotenv.config()

import express, { Request, Response, NextFunction } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import router from './router'
import { baseConfig } from './config'

export const app = express()
const PORT = baseConfig.port

// Middleware to parse JSON request bodies
app.use(express.json())

// Middleware to add security headers
app.use(helmet())

// Middleware to log HTTP requests
app.use(morgan('combined'))

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100 // limit each IP to 100 requests per windowMs
})
app.use(limiter)

// Route handler for the health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).send('OK')
})

// Input validation middleware using Joi
// app.use((req: Request, res: Response, next: NextFunction) => {
//   const schema = Joi.object({
//     username: Joi.string().min(3).max(30).required(),
//     password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
//     email: Joi.string().email().required()
//   })

//   const { error } = schema.validate(req.body)

//   if (error) {
//     return res.status(400).json({ error: error.details[0].message })
//   }

//   next()
// })

// Mounting the router with the /api prefix
app.use('/api', router)

// Middleware to handle errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack || err)
  res.status(500).send('Internal Server Error')
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

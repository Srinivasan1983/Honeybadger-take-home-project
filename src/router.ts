import express, { Request, Response } from 'express'
import Joi from 'joi'
import notificationController from './notificationController'

const router = express.Router()

const schema = Joi.object({
  message: Joi.string().allow('').optional(),
  email: Joi.string().email().required()
})

// Route handler for the root endpoint of the router
router.get('/', (req: Request, res: Response) => {
  res.send('Hello World from the /api endpoint!')
})

// Route handler for another endpoint of the router
router.get('/handleNotification', async (req: Request, res: Response) => {
  const { email, message } = req.body

  const { error } = schema.validate(req.body)

  if (error) {
    return res.status(400).json({ error: error.details[0].message })
  }

  // Handle the case where the validation check passes
  await notificationController.handleSlackNotification(email, message.trim())

  return res.json({ success: true, message: 'Notification sent successfully' })
})

export default router

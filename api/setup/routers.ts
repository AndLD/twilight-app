import { Express, Router } from 'express'
import { validate } from 'simple-express-validation'
import { domainControllers } from '../controllers/domain'
import { domainValidationSchemas } from '../validation/domain'

export function setupRouters(app: Express) {
  const apiRouter = Router()
  app.use('/api', apiRouter)

  apiRouter.post('/domain/infections', validate(domainValidationSchemas.post), domainControllers.post)
}

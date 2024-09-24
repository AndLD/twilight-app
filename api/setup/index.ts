import httpServer from 'http'
import dotenv from 'dotenv'
dotenv.config()
import { getLogger } from '../utils/logger'
import packageJson from '../package.json'
import { setupApp } from './app'
import { setupRouters } from './routers'

const logger = getLogger('setup/index')

const port = process.env.PORT || 8080
let server: httpServer.Server | null = null

export async function startApp() {
  logger.info(`${packageJson.name} ${packageJson.version}. Starting app...`)

  const app = setupApp()
  setupRouters(app)

  app.listen(port, () => {
    logger.info(`Server has been started on ${port}`)
  })
}

export async function stopApp() {
  if (server) {
    server.close()
  }
}

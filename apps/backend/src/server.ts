import { createServer } from 'http'
import app from './api/index.js'
import { appConfig } from './config/index.js'
import { createModuleLogger } from './utils/logger.js'

const server = createServer(app)
const log = createModuleLogger('Server')

server.listen(appConfig.PORT, () => {
  log.info(`Server running on port ${appConfig.PORT}`)
})

import { createLogger, transports, format, Logger } from 'winston'
import { TransformableInfo } from 'logform'

const { combine, timestamp, printf, colorize } = format

interface CustomLogEntry extends TransformableInfo {
  module?: string
  timestamp?: string
}

const logFormat = printf((info: CustomLogEntry) => {
  const { level, message, module, timestamp } = info

  const msg = typeof message === 'string' ? message : JSON.stringify(message)

  const time = timestamp
    ? timestamp.replace('T', ' ').replace('Z', '')
    : new Date().toISOString().replace('T', ' ').replace('Z', '')

  const moduleTag = module ? module : 'SYSTEM'

  return `[${moduleTag}: ${level}] - ${time} | ${msg}`
})

export const logger: Logger = createLogger({
  level: 'info',
  transports: [
    new transports.Console({
      format: combine(
        timestamp({
          format: 'YYYY-MM-DD HH:mm:ss.SSS',
        }),
        colorize({ all: true }),
        logFormat
      ),
    }),
  ],
})

/**
 * Crea un logger figlio con un'etichetta di modulo definita.
 * @param module L'etichetta per il modulo o servizio (es. "SEED").
 * @returns Un winston child logger con metadati predefiniti.
 */
export function createModuleLogger(module: string): Logger {
  return logger.child({ module: module.toUpperCase() })
}

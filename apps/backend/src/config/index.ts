import 'dotenv/config'
import path from 'path'
import fs from 'fs'
import { z } from 'zod'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const privkey = fs.readFileSync(
  path.join(__dirname, '../../keys/private.key'),
  'utf8'
)
const pubkey = fs.readFileSync(
  path.join(__dirname, '../../keys/public.key'),
  'utf8'
)

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().min(1),
  JWT_PRIVATE_KEY: z.string().default(privkey),
  JWT_PUBLIC_KEY: z.string().default(pubkey),
  JWT_EXPIRES_IN: z.string().default('1h'),
  CORS_ORIGINS: z.string().default('*'),
})

export const appConfig = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  LOG_LEVEL: process.env.LOG_LEVEL,
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_PRIVATE_KEY: privkey,
  JWT_PUBLIC_KEY: pubkey,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  CORS_ORIGINS: process.env.CORS_ORIGINS,
})

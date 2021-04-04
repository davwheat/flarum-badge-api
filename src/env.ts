import dotenv from 'dotenv'

// load env data from .env
dotenv.config({
  path: '../.env',
})

const ENV = {
  BASE_URL: process.env.BASE_URL || '(PLEASE SET BASE_URL)',
  PORT: parseInt(process.env.PORT as string) || 3000,
} as const

export default ENV

// NODEMON -> gerenciar o seu projeto
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

import express from 'express'
import cors from 'cors'
import cron from 'node-cron'

import pizzasRoutes from './routes/pizzas.routes.js'
import soliciationsRoutes from './routes/solicitations.routes.js'
import { sendEmailSolicitationInProduction } from './jobs/sendEmailSolicitationInProduction.js'

const app = express()

app.use(express.json())
app.use(cors())
app.use(pizzasRoutes)
app.use(soliciationsRoutes)

cron.schedule('*/1 * * * *', sendEmailSolicitationInProduction)

export default app
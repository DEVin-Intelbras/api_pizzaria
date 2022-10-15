import {Router} from 'express'
import { create, findMany, findOne, updateStatus } from '../controllers/solicitation.controller.js'

const soliciationsRoutes = Router()

soliciationsRoutes.get('/solicitations', findMany)
soliciationsRoutes.get('/solicitations/:id', findOne)
soliciationsRoutes.post('/solicitations', create)
soliciationsRoutes.patch('/solicitations/:id/status', updateStatus)

export default soliciationsRoutes
import {Router} from 'express'
import {findMany, create} from '../controllers/pizza.controller.js'

const pizzasRoutes = Router()

pizzasRoutes.get('/pizzas', findMany)
pizzasRoutes.post('/pizzas',create)

export default pizzasRoutes
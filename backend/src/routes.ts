import {Router} from 'express'
import { itemController } from './controllers/ItemController'

const routes = Router()

routes.get('/items',itemController.index)

routes.post('items',itemController.index)

export {routes}




import {Router} from 'express'
import { itemController } from './controllers/ItemController.js'

const routes = Router()

routes.post("/items", itemController.store);
routes.get("/items", itemController.listAll)

export {routes}




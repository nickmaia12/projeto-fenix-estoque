import {Request, Response } from 'express'
import { itemService } from '../services/ItemService'

class ItemController {
    index(req: Request, res: Response){
        const items = itemService.getAll()
        return res.json(items)
    }

    store(req: Request, res: Response){
        const {nome, quantidade, categoria } = req.body

        const newItem = itemService.create(nome,quantidade,categoria)

        return res.status(200).json(newItem)

    }
}

export const itemController = new ItemController();
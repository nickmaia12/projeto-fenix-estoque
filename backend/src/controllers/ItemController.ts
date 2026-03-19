import {Request, Response } from 'express'
import { itemService } from 'src/services/ItemService.js'

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
    listAll(req: Request, res: Response){
        const items = itemService.getAll()
        return res.json(items)
    }
    remove(req: Request, res: Response){
        const { id } = req.params as {id: string}
        const sucess = itemService.delete(id)

        if(!sucess) {
            return res.status(400).json({message : "item nao encontrado"})
        }
        return res.status(204).send()
    }
    update(req: Request, res: Response){
        const { id } = req.params as {id: string}
        const { nome, quantidade,categoria} = req.body
        const updatedItem = itemService.update(id, {nome,quantidade,categoria})
        if(!updatedItem){
            return res.status(400).json({message: "item nao encontrado"})
        }
        return res.json(updatedItem)
    }
}

export const itemController = new ItemController();
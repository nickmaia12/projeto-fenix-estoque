import { itemService } from "../services/ItemService.js";

describe('ItemService',()=>{
    it('deve ser capaz de criar um novo item com um ID valido',()=>{
        const item = itemService.create('Teclado Mecanico', 5, 'Hardware')

        expect(item.id).toStrictEqual(item.id)
        expect(item.nome).toEqual('Teclado Mecanico')
    })
})
import { itemService } from "../services/ItemService.js";

describe('ItemService',()=>{
    it('deve ser capaz de criar um novo item com um ID valido',()=>{
        const item = itemService.create('Teclado Mecanico', 5, 'Hardware')

        expect(item.id).toBeDefined()
        expect(typeof item.id).toBe('string')

        expect(item.nome).toBe('Teclado Mecanico')
        expect(item.quantidade).toBe(5)


    })
    it('deve garantir que cada item receba um ID diferente', ()=>{
        const item1 = itemService.create('Mouse', 1,'Perifericos')
        const item2 = itemService.create('Monitor',1,'Hardware')

        expect(item1.id).not.toBe(item2.id)
    })
})
import { Item } from "../models/Item.js";
import { v4 as uuid } from "uuid";

class ItemService {
  private items: Item[] = [];

  getAll() {
    return this.items;
  }

  create(nome: string, quantidade: number, categoria: string) {
    if(quantidade < 0) {
      throw new Error("a quantidade nao pode ser negativa")
    }
    
    const newItem: Item = {
      id: uuid(),
      nome,
      quantidade,
      categoria,
      status: "disponivel",
    };
    this.items.push(newItem);
    return newItem;
  }
  delete(id: string): boolean {
    const index = this.items.findIndex(item => item.id === id);
    if(index !== -1){
      this.items.splice(index ,1)
      return true
    }
    return false
  }
}
export const itemService = new ItemService();

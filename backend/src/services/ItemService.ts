import { Item } from "../models/Item";
import { v4 as uuid } from "uuid";

class ItemService {
  private items: Item[] = [];

  getAll() {
    return this.items;
  }

  create(nome: string, quantidade: number, categoria: string) {
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
}
export const itemService = new ItemService();

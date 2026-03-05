export interface Item {
    id: string,
    nome: string,
    quantidade: number,
    categoria: string,
    status: 'disponivel' | 'esgotado' | 'em transito'
}
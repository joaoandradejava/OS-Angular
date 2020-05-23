import { TProduto } from './enums/TProduto'

export class Produto {
    id: number
    marca: string
    modelo: string
    valor: number
    codigo: string
    tipoProduto: TProduto
}
import { Cliente } from './Cliente'
import { Funcionario } from './Funcionario'
import { Fornecedor } from './Fornecedor'
import { Produto } from './Produto'

export class OrdemDeServico {
    id: number
    descricao: string
    dataInicio: string
    dataFim: string
    valor: number
    cliente: Cliente = new Cliente()
    funcionario: Funcionario = new Funcionario()
    fornecedor: Fornecedor = new Fornecedor()
    produtos: Array<Produto> = new Array()
}
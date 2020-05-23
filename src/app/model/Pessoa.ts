import { TSexo } from './enums/TSexo'
import { Telefone } from './Telefone'

export class Pessoa {
    id: number
    nome: string
    sexo: TSexo
    dataNascimento: string
    cpf: string

    telefones: Array<Telefone> = new Array()
}
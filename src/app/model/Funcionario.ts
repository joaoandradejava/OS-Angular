import { TFuncao } from './enums/TFuncao'
import { Pessoa } from './Pessoa'

export class Funcionario extends Pessoa {
    matricula: string
    funcao: TFuncao
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Url } from '../util/Url';
import { Funcionario } from '../model/Funcionario';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  constructor(private http: HttpClient) { }

  buscarTodosDoSitema(): Observable<any> {
    return this.http.get<any>(Url.baseFuncionario)
  }

  buscarTodos(pagina: any): Observable<any> {
    return this.http.get<any>(Url.baseFuncionario + 'pagina/' + pagina)
  }

  buscarPorId(id: any): Observable<any> {
    return this.http.get<any>(Url.baseFuncionario + id)
  }

  buscarPorNome(pagina: any, nome: string): Observable<any> {
    return this.http.get<any>(Url.baseFuncionario + 'pagina/' + pagina + '/nome/' + nome)
  }

  salvar(funcionario: Funcionario): Observable<any> {
    return this.http.post(Url.baseFuncionario, funcionario, { responseType: 'text' })
  }

  atualizar(funcionario: Funcionario): Observable<any> {
    return this.http.put(Url.baseFuncionario, funcionario, { responseType: 'text' })
  }

  deletarPorId(id: any): Observable<any> {
    return this.http.delete(Url.baseFuncionario + id, { responseType: 'text' })
  }

  gerarRelatorio(): Observable<any> {
    return this.http.get(Url.baseFuncionario + 'gerarRelatorio', { responseType: 'text' })
  }

  gerarRelatorioComParametro(funcionarioParametro: any): Observable<any> {
    return this.http.post(Url.baseFuncionario + 'gerarRelatorio', funcionarioParametro, { responseType: 'text' })
  }

}

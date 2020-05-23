import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Url } from '../util/Url';
import { Cliente } from '../model/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  buscarTodosDoSitema(): Observable<any> {
    return this.http.get<any>(Url.baseCliente)
  }

  buscarTodos(pagina: any): Observable<any> {
    return this.http.get<any>(Url.baseCliente + 'pagina/' + pagina)
  }

  buscarPorId(id: any): Observable<any> {
    return this.http.get<any>(Url.baseCliente + id)
  }

  buscarPorNome(pagina: any, nome: string): Observable<any> {
    return this.http.get<any>(Url.baseCliente + 'pagina/' + pagina + '/nome/' + nome)
  }

  salvar(cliente: Cliente): Observable<any> {
    return this.http.post(Url.baseCliente, cliente, { responseType: 'text' })
  }

  atualizar(cliente: Cliente): Observable<any> {
    return this.http.put(Url.baseCliente, cliente, { responseType: 'text' })
  }

  deletarPorId(id: any): Observable<any> {
    return this.http.delete(Url.baseCliente + id, { responseType: 'text' })
  }

  gerarRelatorio(): Observable<any> {
    return this.http.get(Url.baseCliente + 'gerarRelatorio', { responseType: 'text' })
  }

  gerarRelatorioComParametro(clienteParametro: any): Observable<any> {
    return this.http.post(Url.baseCliente + 'gerarRelatorio', clienteParametro, { responseType: 'text' })
  }

}

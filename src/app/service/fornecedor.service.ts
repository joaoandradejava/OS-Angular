import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Url } from '../util/Url';
import { Observable } from 'rxjs';
import { Fornecedor } from '../model/Fornecedor';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  constructor(private http: HttpClient) { }

  buscarTodosDoSitema(): Observable<any> {
    return this.http.get<any>(Url.baseFornecedor)
  }

  buscarTodos(pagina: any): Observable<any> {
    return this.http.get<any>(Url.baseFornecedor + 'pagina/' + pagina)
  }

  buscarPorId(id: any): Observable<any> {
    return this.http.get<any>(Url.baseFornecedor + id)
  }

  buscarPorNome(pagina: any, nome: string): Observable<any> {
    return this.http.get<any>(Url.baseFornecedor + 'pagina/' + pagina + '/nome/' + nome)
  }

  salvar(fornecedor: Fornecedor): Observable<any> {
    return this.http.post(Url.baseFornecedor, fornecedor, { responseType: 'text' })
  }

  atualizar(fornecedor: Fornecedor): Observable<any> {
    return this.http.put(Url.baseFornecedor, fornecedor, { responseType: 'text' })
  }

  deletarPorId(id: any): Observable<any> {
    return this.http.delete(Url.baseFornecedor + id, { responseType: 'text' })
  }

  gerarRelatorio(): Observable<any> {
    return this.http.get(Url.baseFornecedor + 'gerarRelatorio', { responseType: 'text' })
  }
}

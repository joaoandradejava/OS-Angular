import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Url } from '../util/Url';
import { Produto } from '../model/Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  buscarTodosDoSitema(): Observable<any> {
    return this.http.get<any>(Url.baseProduto)
  }

  buscarTodos(pagina: any): Observable<any> {
    return this.http.get<any>(Url.baseProduto + 'pagina/' + pagina)
  }

  buscarPorId(id: any): Observable<any> {
    return this.http.get<any>(Url.baseProduto + id)
  }

  buscarPorCodigo(pagina: any, codigo: string): Observable<any> {
    return this.http.get<any>(Url.baseProduto + 'pagina/' + pagina + '/codigo/' + codigo)
  }

  salvar(produto: Produto): Observable<any> {
    return this.http.post(Url.baseProduto, produto, { responseType: 'text' })
  }

  atualizar(produto: Produto): Observable<any> {
    return this.http.put(Url.baseProduto, produto, { responseType: 'text' })
  }

  deletarPorId(id: any): Observable<any> {
    return this.http.delete(Url.baseProduto + id, { responseType: 'text' })
  }

  gerarRelatorio(): Observable<any> {
    return this.http.get(Url.baseProduto + 'gerarRelatorio', { responseType: 'text' })
  }

  gerarGrafico(): Observable<any> {
    return this.http.get<any>(Url.baseProduto + 'gerarGrafico')
  }


}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Url } from '../util/Url';
import { OrdemDeServico } from '../model/OrdemDeServico';

@Injectable({
  providedIn: 'root'
})
export class OrdemDeServicoService {

  constructor(private http: HttpClient) { }

  buscarTodos(pagina: any): Observable<any> {
    return this.http.get<any>(Url.baseOrdemDeServico + 'pagina/' + pagina)
  }

  buscarPorId(id: any): Observable<any> {
    return this.http.get<any>(Url.baseOrdemDeServico + id)
  }

  salvar(ordemDeServico: OrdemDeServico): Observable<any> {
    return this.http.post(Url.baseOrdemDeServico, ordemDeServico, { responseType: 'text' })
  }

  atualizar(ordemDeServico: OrdemDeServico): Observable<any> {
    return this.http.put(Url.baseOrdemDeServico, ordemDeServico, { responseType: 'text' })
  }

  deletarPorId(id: any): Observable<any> {
    return this.http.delete(Url.baseOrdemDeServico + id, { responseType: 'text' })
  }

  gerarRelatorio(): Observable<any> {
    return this.http.get(Url.baseOrdemDeServico + 'gerarRelatorio', { responseType: 'text' })
  }

}

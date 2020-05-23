import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Url } from '../util/Url';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  buscarTodos(pagina: any): Observable<any> {
    return this.http.get<any>(Url.baseUsuario + 'pagina/' + pagina)
  }

  buscarPorId(id: any): Observable<any> {
    return this.http.get<any>(Url.baseUsuario + id)
  }

  buscarPorNome(pagina: any, nome: string): Observable<any> {
    return this.http.get<any>(Url.baseUsuario + 'pagina/' + pagina + '/nome/' + nome)
  }

  salvar(usuario: Usuario): Observable<any> {
    return this.http.post(Url.baseUsuario, usuario, { responseType: 'text' })
  }

  atualizar(usuario: Usuario): Observable<any> {
    return this.http.put(Url.baseUsuario, usuario, { responseType: 'text' })
  }

  deletarPorId(id: any): Observable<any> {
    return this.http.delete(Url.baseUsuario + id, { responseType: 'text' })
  }
}

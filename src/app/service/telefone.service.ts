import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Url } from '../util/Url';

@Injectable({
  providedIn: 'root'
})
export class TelefoneService {

  constructor(private http: HttpClient) { }

  deletarPorId(id: any): Observable<any> {
    return this.http.delete(Url.baseTelefone + id, { responseType: 'text' })
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Url } from '../util/Url';
import { Router } from '@angular/router';
import { AlertsService } from 'angular-alert-module';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private alerts: AlertsService, private http: HttpClient, private router: Router) { }

  logar(login: any) {
    localStorage.clear()
    this.http.post(Url.baseLogin, JSON.stringify(login)).subscribe(data => {
      const token = JSON.parse(JSON.stringify(data)).Authorization.split(' ')[1]
      localStorage.setItem('token', token)

      this.router.navigate(['home'])
    }, error => {
      this.alerts.setMessage('Acesso negado! login ou senha invalidos!', 'error')
    })
  }
}

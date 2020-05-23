import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = { login: '', senha: '' }

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.redirecionarParaAHomeCasoEstejaLogado()
  }

  logar() {
    this.loginService.logar(this.login)
  }

  redirecionarParaAHomeCasoEstejaLogado() {
    if (this.isLogado()) {
      this.router.navigate(['home'])
    }
  }

  isLogado(): boolean {
    return localStorage.getItem('token') != null ? true : false
  }

}

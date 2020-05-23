import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsService } from 'angular-alert-module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'OS';

  constructor(private alerts: AlertsService, private router: Router) { }

  ngOnInit(): void {
    this.alerts.setDefaults('timeout', 1.7);
    this.redirecionarParaOLoginCasoNaoEstejaLogado()
  }

  sair() {
    localStorage.clear()
    this.router.navigate(['login'])
  }

  redirecionarParaOLoginCasoNaoEstejaLogado() {
    if (!this.isLogado()) {
      this.router.navigate(['login'])
    }
  }

  isLogado(): boolean {
    return localStorage.getItem('token') != null ? true : false
  }
}

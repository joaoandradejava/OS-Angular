import { Injectable, NgModule } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
    if (localStorage.getItem('token') != null) {
      const token = 'Bearer ' + localStorage.getItem('token')
      const temp = req.clone({ setHeaders: { 'Authorization': token } })

      return next.handle(temp).pipe(catchError(this.handleError))
    } else {
      return next.handle(req).pipe(catchError(this.handleError))
    }
  }

  handleError(error: HttpErrorResponse) {
    let mensagem = ''
    if (error instanceof ErrorEvent) {
      mensagem = 'Mensagem: ' + error.error.mensagem
    } else {
      if (error.error.status === 403) {
        mensagem = 'Sessão expirada! logue novamente no sistema.'
      } else {
        let tempError = error.error
        if (tempError instanceof Object) {
          mensagem = 'Codigo: ' + tempError.codigo + '\nMensagem: ' + tempError.mensagem
        } else {
          tempError = JSON.parse(error.error)
          mensagem = 'Codigo: ' + tempError.codigo + '\nMensagem: ' + tempError.mensagem
        }
      }
    }

    alert(mensagem)
    return throwError(mensagem)
  }
}

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ]
})

export class HttpInterceptorModule { }

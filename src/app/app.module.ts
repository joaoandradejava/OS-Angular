import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClientesComponent } from './cliente/clientes/clientes.component';
import { AddClienteComponent } from './cliente/add-cliente/add-cliente.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { HttpInterceptorModule } from './service/http-interceptor.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FornecedoresComponent } from './fornecedor/fornecedores/fornecedores.component';
import { AddFornecedorComponent } from './fornecedor/add-fornecedor/add-fornecedor.component';
import { AddFuncionarioComponent } from './funcionario/add-funcionario/add-funcionario.component';
import { FuncionariosComponent } from './funcionario/funcionarios/funcionarios.component';
import { ProdutosComponent } from './produto/produtos/produtos.component';
import { HomeComponent } from './home/home.component';
import { AddProdutoComponent } from './produto/add-produto/add-produto.component';
import { NgxCurrencyModule } from "ngx-currency";
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './guard/login.guard';
import { AddUsuarioComponent } from './usuario/add-usuario/add-usuario.component';
import { ChartsModule } from 'ng2-charts';
import { GraficoProdutoComponent } from './produto/grafico-produto/grafico-produto.component';
import { OrdensComponent } from './ordem de serviço/ordens/ordens.component';
import { AddOrdemComponent } from './ordem de serviço/add-ordem/add-ordem.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AlertsModule } from 'angular-alert-module';
import { RelatorioClienteParametroComponent } from './cliente/relatorio-cliente-parametro/relatorio-cliente-parametro.component';
import { RelatorioFuncionarioParametroComponent } from './funcionario/relatorio-funcionario-parametro/relatorio-funcionario-parametro.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastrarUsuario', component: AddUsuarioComponent },
  { path: 'home', component: HomeComponent, canActivate: [LoginGuard] },

  { path: 'clientes', component: ClientesComponent, canActivate: [LoginGuard] },
  { path: 'addCliente', component: AddClienteComponent, canActivate: [LoginGuard] },
  { path: 'addCliente/:id', component: AddClienteComponent, canActivate: [LoginGuard] },
  { path: 'relatorioCliente', component: RelatorioClienteParametroComponent, canActivate: [LoginGuard] },

  { path: 'fornecedores', component: FornecedoresComponent, canActivate: [LoginGuard] },
  { path: 'addFornecedor', component: AddFornecedorComponent, canActivate: [LoginGuard] },
  { path: 'addFornecedor/:id', component: AddFornecedorComponent, canActivate: [LoginGuard] },

  { path: 'funcionarios', component: FuncionariosComponent, canActivate: [LoginGuard] },
  { path: 'addFuncionario', component: AddFuncionarioComponent, canActivate: [LoginGuard] },
  { path: 'addFuncionario/:id', component: AddFuncionarioComponent, canActivate: [LoginGuard] },
  { path: 'relatorioFuncionario', component: RelatorioFuncionarioParametroComponent, canActivate: [LoginGuard] },

  { path: 'produtos', component: ProdutosComponent, canActivate: [LoginGuard] },
  { path: 'addProduto', component: AddProdutoComponent, canActivate: [LoginGuard] },
  { path: 'addProduto/:id', component: AddProdutoComponent, canActivate: [LoginGuard] },
  { path: 'graficoProduto', component: GraficoProdutoComponent, canActivate: [LoginGuard] },

  { path: 'ordens', component: OrdensComponent, canActivate: [LoginGuard] },
  { path: 'addOrdem', component: AddOrdemComponent, canActivate: [LoginGuard] },
  { path: 'addOrdem/:id', component: AddOrdemComponent, canActivate: [LoginGuard] },
];

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    AddClienteComponent,
    FornecedoresComponent,
    AddFornecedorComponent,
    AddFuncionarioComponent,
    FuncionariosComponent,
    ProdutosComponent,
    HomeComponent,
    AddProdutoComponent,
    LoginComponent,
    AddUsuarioComponent,
    GraficoProdutoComponent,
    OrdensComponent,
    AddOrdemComponent,
    RelatorioClienteParametroComponent,
    RelatorioFuncionarioParametroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    NgbModule,
    NgxMaskModule.forRoot(options),
    HttpInterceptorModule,
    NgxPaginationModule,
    NgxCurrencyModule,
    ChartsModule,
    NgMultiSelectDropDownModule.forRoot(),
    AlertsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

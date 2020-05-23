import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/model/Cliente';
import { ClienteService } from 'src/app/service/cliente.service';
import { AlertsService } from 'angular-alert-module';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  nome: string
  clientes: Array<Cliente> = new Array()
  configPaginate = {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: 0
  }

  constructor(private alerts: AlertsService, private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.buscarTodos()
  }

  filtrar() {
    if (this.isNomeVazio()) {
      this.buscarTodos()
    } else {
      this.buscarPorNome()
    }
  }

  private buscarTodos() {
    this.clienteService.buscarTodos(this.getPagina(this.configPaginate.currentPage)).subscribe(data => {
      this.clientes = data.content
      this.configPaginate.totalItems = data.totalElements
    })
  }

  private buscarPorNome() {
    this.clienteService.buscarPorNome(this.getPagina(this.configPaginate.currentPage), this.nome).subscribe(data => {
      this.clientes = data.content
      this.configPaginate.totalItems = data.totalElements
    })
  }

  deletarPorId(id: number, index: number) {
    if (confirm('Tem certeza que deseja deletar este cliente?')) {
      this.clienteService.deletarPorId(id).subscribe(data => {
        this.clientes.splice(index, 1)
        this.alerts.setMessage(data, 'success');
      })
    }
  }

  private isNomeVazio(): boolean {
    return this.nome == null || this.nome.trim() == '' || this.nome.trim() == 'undefined' ? true : false
  }

  onChangePage(page: any) {
    this.configPaginate.currentPage = page
    if (this.isNomeVazio()) {
      this.buscarTodos()
    } else {
      this.buscarPorNome()
    }
  }

  private getPagina(pagina: number) {
    return --pagina
  }

  gerarRelatorio() {
    this.clienteService.gerarRelatorio().subscribe(data => {
      document.querySelector('iframe').src = data
    })
  }

}

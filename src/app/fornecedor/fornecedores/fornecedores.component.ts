import { Component, OnInit } from '@angular/core';
import { Fornecedor } from 'src/app/model/Fornecedor';
import { FornecedorService } from 'src/app/service/fornecedor.service';
import { AlertsService } from 'angular-alert-module';

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.css']
})
export class FornecedoresComponent implements OnInit {

  nome: string
  fornecedores: Array<Fornecedor> = new Array()
  configPaginate = {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: 0
  }

  constructor(private alerts: AlertsService, private fornecedorService: FornecedorService) { }

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
    this.fornecedorService.buscarTodos(this.getPagina(this.configPaginate.currentPage)).subscribe(data => {
      this.fornecedores = data.content
      this.configPaginate.totalItems = data.totalElements
    })
  }

  private buscarPorNome() {
    this.fornecedorService.buscarPorNome(this.getPagina(this.configPaginate.currentPage), this.nome).subscribe(data => {
      this.fornecedores = data.content
      this.configPaginate.totalItems = data.totalElements
    })
  }

  deletarPorId(id: number, index: number) {
    if (confirm('Tem certeza que deseja deletar este fornecedor?')) {
      this.fornecedorService.deletarPorId(id).subscribe(data => {
        this.fornecedores.splice(index, 1)
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
    this.fornecedorService.gerarRelatorio().subscribe(data => {
      document.querySelector('iframe').src = data
    })
  }

}

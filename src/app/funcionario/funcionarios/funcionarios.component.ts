import { Component, OnInit } from '@angular/core';
import { Funcionario } from 'src/app/model/Funcionario';
import { FuncionarioService } from 'src/app/service/funcionario.service';
import { TFuncao } from 'src/app/model/enums/TFuncao';
import { Telefone } from 'src/app/model/Telefone';
import { TTelefone } from 'src/app/model/enums/TTelefone';
import { AlertsService } from 'angular-alert-module';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent implements OnInit {


  nome: string
  funcao = TFuncao
  funcionarios: Array<Funcionario> = new Array()
  configPaginate = {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: 0
  }

  constructor(private alerts: AlertsService, private funcionarioService: FuncionarioService) { }

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
    this.funcionarioService.buscarTodos(this.getPagina(this.configPaginate.currentPage)).subscribe(data => {
      this.funcionarios = data.content
      this.configPaginate.totalItems = data.totalElements
    })
  }

  private buscarPorNome() {
    this.funcionarioService.buscarPorNome(this.getPagina(this.configPaginate.currentPage), this.nome).subscribe(data => {
      this.funcionarios = data.content
      this.configPaginate.totalItems = data.totalElements
    })
  }

  deletarPorId(id: number, index: number) {
    if (confirm('Tem certeza que deseja deletar este funcionario?')) {
      this.funcionarioService.deletarPorId(id).subscribe(data => {
        this.funcionarios.splice(index, 1)
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
    this.funcionarioService.gerarRelatorio().subscribe(data => {
      document.querySelector('iframe').src = data
    })
  }


}

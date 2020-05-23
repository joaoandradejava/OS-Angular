import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/model/Produto';
import { ProdutoService } from 'src/app/service/produto.service';
import { TProduto } from 'src/app/model/enums/TProduto';
import { AlertsService } from 'angular-alert-module';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  codigo: string
  produtos: Array<Produto> = new Array()
  tipoProduto = TProduto
  configPaginate = {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: 0
  }

  constructor(private alerts: AlertsService, private produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.buscarTodos()
  }

  filtrar() {
    if (this.isCodigoVazio()) {
      this.buscarTodos()
    } else {
      this.buscarPorCodigo()
    }
  }

  private buscarTodos() {
    this.produtoService.buscarTodos(this.getPagina(this.configPaginate.currentPage)).subscribe(data => {
      this.produtos = data.content
      this.configPaginate.totalItems = data.totalElements
    })
  }

  private buscarPorCodigo() {
    this.produtoService.buscarPorCodigo(this.getPagina(this.configPaginate.currentPage), this.codigo).subscribe(data => {
      this.produtos = data.content
      this.configPaginate.totalItems = data.totalElements
    })
  }

  deletarPorId(id: number, index: number) {
    if (confirm('Tem certeza que deseja deletar este produto?')) {
      this.produtoService.deletarPorId(id).subscribe(data => {
        this.produtos.splice(index, 1)
        this.alerts.setMessage(data, 'success');
      })
    }
  }

  private isCodigoVazio(): boolean {
    return this.codigo == null || this.codigo.trim() == '' || this.codigo.trim() == 'undefined' ? true : false
  }

  onChangePage(page: any) {
    this.configPaginate.currentPage = page
    if (this.isCodigoVazio()) {
      this.buscarTodos()
    } else {
      this.buscarPorCodigo()
    }
  }

  private getPagina(pagina: number) {
    return --pagina
  }

  gerarRelatorio() {
    this.produtoService.gerarRelatorio().subscribe(data => {
      document.querySelector('iframe').src = data
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/model/Produto';
import { ProdutoService } from 'src/app/service/produto.service';
import { ActivatedRoute } from '@angular/router';
import { TProduto } from 'src/app/model/enums/TProduto';
import { Url } from 'src/app/util/Url';
import { AlertsService } from 'angular-alert-module';

@Component({
  selector: 'app-add-produto',
  templateUrl: './add-produto.component.html',
  styleUrls: ['./add-produto.component.css']
})
export class AddProdutoComponent implements OnInit {

  produto: Produto = new Produto()
  key = Object.keys
  tipoProduto = TProduto

  constructor(private alerts: AlertsService, private produtoService: ProdutoService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    if (id != null) {
      this.buscarPorId(id)
    }
  }

  private buscarPorId(id: any) {
    this.produtoService.buscarPorId(id).subscribe(data => {
      this.produto = data
    })
  }

  private salvar() {
    this.produtoService.salvar(this.produto).subscribe(data => {
      this.limparFormulario()
      this.alerts.setMessage(data, 'success');
    })
  }

  private atualizar() {
    this.produtoService.atualizar(this.produto).subscribe(data => {
      this.limparFormulario()
      this.alerts.setMessage(data, 'success');
    })
  }

  salvarAction() {
    if (this.produto.id == null || this.produto.id.toString().trim() == '' || this.produto.id.toString().trim() == 'undefined') {
      this.salvar()
    } else {
      this.atualizar()
    }
  }


  limparFormulario() {
    this.produto = new Produto()
  }


}

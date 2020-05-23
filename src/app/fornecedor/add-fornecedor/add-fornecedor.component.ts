import { Component, OnInit } from '@angular/core';
import { FornecedorService } from 'src/app/service/fornecedor.service';
import { Fornecedor } from 'src/app/model/Fornecedor';
import { ActivatedRoute } from '@angular/router';
import { AlertsService } from 'angular-alert-module';

@Component({
  selector: 'app-add-fornecedor',
  templateUrl: './add-fornecedor.component.html',
  styleUrls: ['./add-fornecedor.component.css']
})
export class AddFornecedorComponent implements OnInit {

  fornecedor: Fornecedor = new Fornecedor()

  constructor(private alerts: AlertsService, private fornecedorService: FornecedorService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    if (id != null) {
      this.buscarPorId(id)
    }
  }

  private buscarPorId(id: any) {
    this.fornecedorService.buscarPorId(id).subscribe(data => {
      this.fornecedor = data
    })
  }

  private salvar() {
    this.fornecedorService.salvar(this.fornecedor).subscribe(data => {
      this.limparFormulario()
      this.alerts.setMessage(data, 'success')
    })
  }

  private atualizar() {
    this.fornecedorService.atualizar(this.fornecedor).subscribe(data => {
      this.limparFormulario()
      this.alerts.setMessage(data, 'success')
    })
  }

  salvarAction() {
    if (this.fornecedor.id == null || this.fornecedor.id.toString().trim() == '' || this.fornecedor.id.toString().trim() == 'undefined') {
      this.salvar()
    } else {
      this.atualizar()
    }
  }


  limparFormulario() {
    this.fornecedor = new Fornecedor()
  }

}

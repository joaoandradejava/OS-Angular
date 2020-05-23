import { Component, OnInit } from '@angular/core';
import { OrdemDeServico } from 'src/app/model/OrdemDeServico';
import { OrdemDeServicoService } from 'src/app/service/ordem-de-servico.service';
import { AlertsService } from 'angular-alert-module';

@Component({
  selector: 'app-ordens',
  templateUrl: './ordens.component.html',
  styleUrls: ['./ordens.component.css']
})
export class OrdensComponent implements OnInit {

  ordemDeServicos: Array<OrdemDeServico> = new Array()
  configPaginate = {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: 0
  }

  constructor(private alerts: AlertsService, private ordemDeServicoService: OrdemDeServicoService) { }

  ngOnInit(): void {
    this.buscarTodos()
  }

  private buscarTodos() {
    this.ordemDeServicoService.buscarTodos(this.getPagina(this.configPaginate.currentPage)).subscribe(data => {
      this.ordemDeServicos = data.content
      this.configPaginate.totalItems = data.totalElements
    })
  }



  deletarPorId(id: number, index: number) {
    if (confirm('Tem certeza que deseja deletar esta ordem de serviço?')) {
      this.ordemDeServicoService.deletarPorId(id).subscribe(data => {
        this.ordemDeServicos.splice(index, 1)
        this.alerts.setMessage(data, 'success');
      })
    }
  }


  onChangePage(page: any) {
    this.configPaginate.currentPage = page
    this.buscarTodos()
  }

  private getPagina(pagina: number) {
    return --pagina
  }

  gerarRelatorio() {
    this.ordemDeServicoService.gerarRelatorio().subscribe(data => {
      document.querySelector('iframe').src = data
    })
  }
}

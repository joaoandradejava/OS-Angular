import { Component, OnInit, Injectable } from '@angular/core';
import { NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { OrdemDeServico } from 'src/app/model/OrdemDeServico';
import { ActivatedRoute } from '@angular/router';
import { OrdemDeServicoService } from 'src/app/service/ordem-de-servico.service';
import { Cliente } from 'src/app/model/Cliente';
import { ClienteService } from 'src/app/service/cliente.service';
import { FornecedorService } from 'src/app/service/fornecedor.service';
import { FuncionarioService } from 'src/app/service/funcionario.service';
import { Fornecedor } from 'src/app/model/Fornecedor';
import { Funcionario } from 'src/app/model/Funcionario';
import { ProdutoService } from 'src/app/service/produto.service';
import { Produto } from 'src/app/model/Produto';
import { AlertsService } from 'angular-alert-module';

@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '/';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? formatarData(date.day) + this.DELIMITER + formatarData(date.month) + this.DELIMITER + date.year : null;
  }
}

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? formatarData(date.day) + this.DELIMITER + formatarData(date.month) + this.DELIMITER + date.year : '';
  }
}

function formatarData(data: any) {
  if (data != null && data < 10) {
    return '0' + data
  }

  return data
}


@Component({
  selector: 'app-add-ordem',
  templateUrl: './add-ordem.component.html',
  styleUrls: ['./add-ordem.component.css'],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class AddOrdemComponent implements OnInit {

  ordemDeServico: OrdemDeServico = new OrdemDeServico()
  clientes: Array<Cliente> = new Array()
  fornecedores: Array<Fornecedor> = new Array()
  funcionarios: Array<Funcionario> = new Array()
  produtos: Array<Produto> = new Array()

  dropdownSettings = {};

  constructor(private alerts: AlertsService, private produtoService: ProdutoService, private funcionarioService: FuncionarioService, private fornecedorService: FornecedorService, private clienteService: ClienteService, private ordemDeServicoService: OrdemDeServicoService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.buscarTodosClientes()
    this.buscarTodosFornecedores()
    this.buscarTodosFuncionarios()
    this.buscarTodosProdutos()

    const id = this.activatedRoute.snapshot.paramMap.get('id')
    if (id != null) {
      this.buscarPorId(id)
    }

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'modelo',
      selectAllText: 'Selecionar Tudo',
      unSelectAllText: 'Desmarque Todos',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  onItemSelect(item: any) {
    console.log(item);
  }

  onSelectAll(items: any) {
    console.log(items);
  }

  buscarTodosProdutos() {
    this.produtoService.buscarTodosDoSitema().subscribe(data => {
      this.produtos = data
    })
  }

  buscarTodosClientes() {
    this.clienteService.buscarTodosDoSitema().subscribe(data => {
      this.clientes = data
    })
  }

  buscarTodosFuncionarios() {
    this.funcionarioService.buscarTodosDoSitema().subscribe(data => {
      this.funcionarios = data
    })
  }

  buscarTodosFornecedores() {
    this.fornecedorService.buscarTodosDoSitema().subscribe(data => {
      this.fornecedores = data
    })
  }

  private buscarPorId(id: any) {
    this.ordemDeServicoService.buscarPorId(id).subscribe(data => {
      this.ordemDeServico = data
    })
  }

  private salvar() {
    this.ordemDeServicoService.salvar(this.ordemDeServico).subscribe(data => {
      this.limparFormulario()
      this.alerts.setMessage(data, 'success')
    })
  }

  private atualizar() {
    this.ordemDeServicoService.atualizar(this.ordemDeServico).subscribe(data => {
      this.limparFormulario()
      this.alerts.setMessage(data, 'success')
    })
  }

  salvarAction() {
    if (this.ordemDeServico.id == null || this.ordemDeServico.id.toString().trim() == '' || this.ordemDeServico.id.toString().trim() == 'undefined') {
      this.salvar()
    } else {
      this.atualizar()
    }
  }


  limparFormulario() {
    this.ordemDeServico = new OrdemDeServico()
  }


}

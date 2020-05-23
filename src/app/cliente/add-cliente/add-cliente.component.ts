import { Component, OnInit, Injectable } from '@angular/core';
import { TSexo } from 'src/app/model/enums/TSexo';
import { Cliente } from 'src/app/model/Cliente';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/service/cliente.service';
import { NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Telefone } from 'src/app/model/Telefone';
import { TTelefone } from 'src/app/model/enums/TTelefone';
import { TelefoneService } from 'src/app/service/telefone.service';
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
  selector: 'app-add-cliente',
  templateUrl: './add-cliente.component.html',
  styleUrls: ['./add-cliente.component.css'],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class AddClienteComponent implements OnInit {

  cliente: Cliente = new Cliente()
  telefone: Telefone = new Telefone()
  key = Object.keys
  sexo = TSexo
  tipoDeTelefone = TTelefone

  constructor(private alerts: AlertsService, private clienteService: ClienteService, private telefoneService: TelefoneService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    if (id != null) {
      this.buscarPorId(id)
    }
  }

  private buscarPorId(id: any) {
    this.clienteService.buscarPorId(id).subscribe(data => {
      this.cliente = data
    })
  }

  private salvar() {
    this.clienteService.salvar(this.cliente).subscribe(data => {
      this.limparFormulario()
      this.alerts.setMessage(data, 'success')
    })
  }

  private atualizar() {
    this.clienteService.atualizar(this.cliente).subscribe(data => {
      this.limparFormulario()
      this.alerts.setMessage(data, 'success')
    })
  }

  salvarAction() {
    if (this.cliente.id == null || this.cliente.id.toString().trim() == '' || this.cliente.id.toString().trim() == 'undefined') {
      this.salvar()
    } else {
      this.atualizar()
    }
  }

  adicionarTelefone() {
    this.cliente.telefones.push(this.telefone)
    this.telefone = new Telefone()
  }

  deletarTelefone(id: any, index: any) {
    if (confirm('Tem certeza que deseja deletar este telefone?')) {
      if (id == null || id.toString().trim() == '' || id.toString().trim() == 'undefined') {
        this.cliente.telefones.splice(index, 1)
      } else {
        this.telefoneService.deletarPorId(id).subscribe(data => {
          this.cliente.telefones.splice(index, 1)
        })
      }
    }
  }


  limparFormulario() {
    this.cliente = new Cliente()
  }

}

import { Component, OnInit, Injectable } from '@angular/core';
import { Funcionario } from 'src/app/model/Funcionario';
import { FuncionarioService } from 'src/app/service/funcionario.service';
import { ActivatedRoute } from '@angular/router';
import { TSexo } from 'src/app/model/enums/TSexo';
import { NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { TFuncao } from 'src/app/model/enums/TFuncao';
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
  selector: 'app-add-funcionario',
  templateUrl: './add-funcionario.component.html',
  styleUrls: ['./add-funcionario.component.css'],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class AddFuncionarioComponent implements OnInit {

  telefone: Telefone = new Telefone()
  funcionario: Funcionario = new Funcionario()

  key = Object.keys
  sexo = TSexo
  tipoDeTelefone = TTelefone
  funcao = TFuncao
  constructor(private alerts: AlertsService, private telefoneService: TelefoneService, private funcionarioService: FuncionarioService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    if (id != null) {
      this.buscarPorId(id)
    }
  }

  private buscarPorId(id: any) {
    this.funcionarioService.buscarPorId(id).subscribe(data => {
      this.funcionario = data
    })
  }

  private salvar() {
    this.funcionarioService.salvar(this.funcionario).subscribe(data => {
      this.limparFormulario()
      this.alerts.setMessage(data, 'success')
    })
  }

  private atualizar() {
    this.funcionarioService.atualizar(this.funcionario).subscribe(data => {
      this.limparFormulario()
      this.alerts.setMessage(data, 'success')
    })
  }

  salvarAction() {
    if (this.funcionario.id == null || this.funcionario.id.toString().trim() == '' || this.funcionario.id.toString().trim() == 'undefined') {
      this.salvar()
    } else {
      this.atualizar()
    }
  }
  adicionarTelefone() {
    this.funcionario.telefones.push(this.telefone)
    this.telefone = new Telefone()
  }

  deletarTelefone(id: any, index: any) {
    if (confirm('Tem certeza que deseja deletar este telefone?')) {
      if (id == null || id.toString().trim() == '' || id.toString().trim() == 'undefined') {
        this.funcionario.telefones.splice(index, 1)
      } else {
        this.telefoneService.deletarPorId(id).subscribe(data => {
          this.funcionario.telefones.splice(index, 1)
        })
      }
    }
  }

  limparFormulario() {
    this.funcionario = new Funcionario()
  }


}

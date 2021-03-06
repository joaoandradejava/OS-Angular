import { Component, OnInit, Injectable } from '@angular/core';
import { NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { PessoaParametro } from 'src/app/model/PessoaParametro';
import { ClienteService } from 'src/app/service/cliente.service';

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
  selector: 'app-relatorio-cliente-parametro',
  templateUrl: './relatorio-cliente-parametro.component.html',
  styleUrls: ['./relatorio-cliente-parametro.component.css'],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class RelatorioClienteParametroComponent implements OnInit {

  pessoaParametro: PessoaParametro = new PessoaParametro()

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
  }

  gerarRelatorioComParametros() {
    this.clienteService.gerarRelatorioComParametro(this.pessoaParametro).subscribe(data => {
      document.querySelector('iframe').src = data
    })
  }

}

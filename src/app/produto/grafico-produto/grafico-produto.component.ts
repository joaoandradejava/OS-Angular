import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ProdutoService } from 'src/app/service/produto.service';
import { ProdutoGrafico } from 'src/app/model/ProdutoGrafico';

@Component({
  selector: 'app-grafico-produto',
  templateUrl: './grafico-produto.component.html',
  styleUrls: ['./grafico-produto.component.css']
})
export class GraficoProdutoComponent implements OnInit {

  produtoGrafico: ProdutoGrafico = new ProdutoGrafico()

  constructor(private produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.produtoService.gerarGrafico().subscribe(data => {
      this.produtoGrafico = data
      this.barChartLabels = this.produtoGrafico.modelo.split(',')
      const valor = this.produtoGrafico.valor.split(',')
      this.barChartData = [
        { data: valor.map(x => Number.parseFloat(x)), label: 'Produtos mais caros' }
      ];
    })
  }

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [45, 37, 60, 70, 46, 33], label: 'Produtos mais caros' }
  ];
}

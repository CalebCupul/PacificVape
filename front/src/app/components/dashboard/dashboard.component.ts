import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartOptions, ChartType, ChartDataSets, Chart } from 'chart.js';
import { Label } from 'ng2-charts';
import { ClienteService } from 'src/app/services/cliente.service';
import { ProductoService } from 'src/app/services/producto.service';
import { VentaService } from 'src/app/services/venta.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public identity: any;
  public totalingresos: any = 0;
  public totalclientes: any = 0;
  public totalusers: any = 0;
  public totalventas: any = 0;
  public chart = [];

  public barChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value: any, ctx: any) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public barChartLabels: Label[] = [];
  public barChartData: number[] = [];
  public barChartLegend = true;
  public barChartColors = [
    {
      backgroundColor: [
        'rgba(0, 0, 143, 0.3)',
        'rgba(243, 0, 42, 0.3)',
        'rgba(164, 152, 19, 0.3)',
        'rgba(29, 192, 236, 0.3)',
      ],
    },
  ];

 
  public barChartType: ChartType = 'bar';

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value: any, ctx: any) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = false;
  public pieChartColors = [
    {
      backgroundColor: [
        'rgba(255,0,0,0.3)', 
        'rgba(0,255,0,0.3)', 
        'rgba(0,0,255,0.3)', 
        'rgba(134, 152, 29, 0.3)',
        'rgba(29, 192, 236, 0.3)',
        'rgba(0, 27, 143, 0.3)',
        'rgba(243, 90, 154, 0.3)',
        'rgba(255,3,0,0.3)', 
        'rgba(0,255,0,0.3)', 
        'rgba(0,41,255,0.3)', 
        'rgba(164, 152, 19, 0.3)',
        'rgba(29, 192, 236, 0.3)',
        'rgba(0, 0, 143, 0.3)',
        'rgba(243, 0, 42, 0.3)'
      ],
    },
  ];


  constructor(
    private _ventaService: VentaService,
    private _productoService: ProductoService,
    private _clienteService: ClienteService,
    private _userService: UserService,
    private _router: Router
  ) {
    this.identity = _userService.getIdentity();
   }

  ngOnInit(): void {

    if(this.identity){
      this._ventaService.get_ventas().subscribe(
        response =>{
          const ingresos = response["ventas"].map((response: { total: any }) => response.total);
  
          // Ventas totales por usuario
          const users = response["ventas"].map((response: { id_user: any}) => response.id_user.nombre);
  
          // Cuenta las repeticiones por usuario para determinar el numero de ventas
          const counts: any = {};
          users.forEach(function (x: any) { counts[x] = (counts[x] || 0) + 1; });
          this.barChartLabels = Object.keys(counts);
          this.barChartData = Object.values(counts);
  
          // Suma todos los totales de las ventas
          const reducer = (a: any, b: any) => a + b;
          this.totalingresos = ingresos.reduce(reducer);
  
          this.totalventas = ingresos.length;
        },
        error =>{
  
        }
      );
  
      this._productoService.get_productos('').subscribe(
        response =>{
          const stock = response["productos"].map((response: { stock: any } ) => response.stock);
          const items = response["productos"].map((response: { titulo: any}) => response.titulo);
          this.pieChartLabels = items;
          this.pieChartData = stock;
        },
        error =>{
  
        }
      );
  
      this._clienteService.get_clientes('').subscribe(
        response =>{
          const clientes = response["clientes"].map((response: { nombres: any}) => response.nombres);
          
          this.totalclientes = clientes.length;
        },
        error =>{
  
        }
      );
  
      this._userService.get_users().subscribe(
        response =>{
          const users = response["usuarios"].map((response: {nombre: any}) => response.nombre);
          this.totalusers = users.length;
  
        },
        error =>{
  
        }
      );
    }else{
      this._router.navigate(['']);
    }
    
    
    
  }
}

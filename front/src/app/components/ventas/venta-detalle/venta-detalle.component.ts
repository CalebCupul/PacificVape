import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VentaService } from 'src/app/services/venta.service';
import { GLOBAL } from 'src/app/services/GLOBALS';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';

@Component({
  selector: 'app-venta-detalle',
  templateUrl: './venta-detalle.component.html',
  styleUrls: ['./venta-detalle.component.css']
})
export class VentaDetalleComponent implements OnInit {

  public id: any;
  public venta: any;
  public detalle_venta: any;
  public url: any;
  public total: any = 0;

  constructor(
    private _route: ActivatedRoute,
    private _ventaService: VentaService,
  ) { 
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params =>{
      this.id = params['id'];

      this._ventaService.data_venta(this.id).subscribe(
        Response =>{
          this.venta = Response.data.venta;
          this.detalle_venta = Response.data.detalles;
        },
        error =>{
          console.log('error');
        }
      );
    });
  }

}

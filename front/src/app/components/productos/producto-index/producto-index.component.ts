import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { GLOBAL } from '../../../services/GLOBALS';

@Component({
  selector: 'app-producto-index',
  templateUrl: './producto-index.component.html',
  styleUrls: ['./producto-index.component.css']
})
export class ProductoIndexComponent implements OnInit {

  public productos: any;
  public url: any;
  public filtro: any;

  constructor(
    private _productoService : ProductoService
  ) {
    this.url = GLOBAL.url;
   }

  ngOnInit(): void {
    this._productoService.get_productos('').subscribe(
      response =>{
        this.productos = response.productos;
        console.log(this.productos);
      },
      error =>{

      }
    )
  }

  search(searchForm: any){
    this._productoService.get_productos(searchForm.value.filtro).subscribe(
      response =>{
        this.productos = response.productos;
      },
      error =>{

      }
    )
  }

}

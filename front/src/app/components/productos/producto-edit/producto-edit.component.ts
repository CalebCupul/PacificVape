import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GLOBAL } from 'src/app/services/GLOBALS';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget | null;
}

@Component({
  selector: 'app-producto-edit',
  templateUrl: './producto-edit.component.html',
  styleUrls: ['./producto-edit.component.css']
})
export class ProductoEditComponent implements OnInit {

  public producto: any;
  public id: any;
  public categorias: any;
  public url: any;
  public imgSelect: any;
  public file: any;

  constructor(
    private _route: ActivatedRoute,
    private _productoService: ProductoService
  ) { 
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      this.id = params['id'];
      this._productoService.get_producto(this.id).subscribe(
        response =>{
          this.producto = response.producto;
          this._productoService.get_categorias().subscribe(
            response =>{
              this.categorias = response.categorias;
              console.log(this.categorias);
              console.log(this.producto)
            },
            error =>{
      
            }
          )
        },
        error =>{

        }
      )
    })
  }

  imgSelected(event: any){
    if(event.target.files && event.target.files[0]){
      this.file = <File>event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imgSelect = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  onSubmit(productoForm: any){
    if(productoForm.valid){
      this._productoService.actualizar_producto({
        _id: this.id,
        titulo: productoForm.value.titulo,
        marca: productoForm.value.marca,
        imagen: this.file,
        precio_compra: productoForm.value.precio_compra,
        precio_venta: productoForm.value.precio_venta,
        descripcion: productoForm.value.descripcion,
        id_categoria: productoForm.value.id_categoria,
        img_name: this.producto.imagen
      }).subscribe(
        response =>{
          Swal.fire({
            icon: 'success',
            title: 'Hecho!',
            text: 'El producto se actualizó correctamente'
          });

        },
        error =>{

        }
      )
    }else{
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Completa todos los campos antes de registrar un producto'
      });
    }
  }

}

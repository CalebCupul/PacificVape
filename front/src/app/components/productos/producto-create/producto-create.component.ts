import { Component, OnInit } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { Producto } from 'src/app/models/Producto';
import { ProductoService } from '../../../services/producto.service';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget | null;
}

@Component({
  selector: 'app-producto-create',
  templateUrl: './producto-create.component.html',
  styleUrls: ['./producto-create.component.css']
})
export class ProductoCreateComponent implements OnInit {

  public producto: any;
  public titulo: any;
  public file: any;
  public imgSelect: any;
  public categorias: any;
  public identity: any;

  constructor(
    private _productoService: ProductoService,
    private _userService: UserService,
    private _router: Router
  ) { 
    this.producto = new Producto('','','','','',null,null,null,'');
    this.identity = this._userService.getIdentity();
}

  ngOnInit(): void {
    if(this.identity){
      this._productoService.get_categorias().subscribe(
        response =>{
          this.categorias = response.categorias;
          console.log(this.categorias);
        },
        error =>{
  
        }
      );
    }else{
      this._router.navigate(['']);
    }
    
  }

  onSubmit(productoForm: any){
    if(productoForm.valid){
      this._productoService.insertar_producto({
        titulo: productoForm.value.titulo,
        marca: productoForm.value.marca,
        stock: productoForm.value.stock,
        imagen: this.file,
        precio_compra: productoForm.value.precio_compra,
        precio_venta: productoForm.value.precio_venta,
        descripcion: productoForm.value.descripcion,
        id_categoria: productoForm.value.id_categoria
      }).subscribe(
        response =>{
          Swal.fire({
            icon: 'success',
            title: 'Hecho!',
            text: 'El producto se registró correctamente'
          });
          console.log(response)
          this.producto = new Producto('','','','','',null,null,null,'');
          this.imgSelect = '../../../../assets/img/default.jpg';
          productoForm.reset();
        },
        error =>{
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El producto ya se encuentra registrado'
          });
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

  imgSelected(event: any){
    if(event.target.files && event.target.files[0]){
      this.file = <File>event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imgSelect = reader.result;
      reader.readAsDataURL(this.file);
    }
  }



}

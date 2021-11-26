import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { GLOBAL } from '../../../services/GLOBALS';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-producto-index',
  templateUrl: './producto-index.component.html',
  styleUrls: ['./producto-index.component.css']
})
export class ProductoIndexComponent implements OnInit {

  public productos: any;
  public url: any;
  public filtro: any;
  public categorias: any;
  public nombre_categoria: any;
  public descripcion_categoria: any;
  public p: number = 1;
  public _id: any;
  public producto_stock: any;
  public producto_id: any;
  public identity: any
  constructor(
    private _productoService : ProductoService,
    private _userService: UserService,
    private _router: Router
  ) {
    this.url = GLOBAL.url;
    this.identity = this._userService.getIdentity();
   }

  ngOnInit(): void {
    if(this.identity){
      this._productoService.get_productos('').subscribe(
        response =>{
          this.productos = response.productos;
          console.log(this.productos);
        },
        error =>{
  
        }
      );
  
      this._productoService.get_categorias().subscribe(
        response =>{
          this.categorias = response.categorias;
        },
        error =>{
  
        }
      )
    }else{
      this._router.navigate(['']);
    }

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

  guardar_categoria(categoriaForm: any){
    if(categoriaForm.valid){
      this._productoService.insertar_categoria({
        titulo: categoriaForm.value.nombre_categoria,
        descripcion: categoriaForm.value.descripcion_categoria
      }).subscribe(
        response =>{
          this._productoService.get_categorias().subscribe(
            response =>{
              this.categorias = response.categorias;
              Swal.fire({
                icon: 'success',
                title: 'Hecho!',
                text: 'La categoría se registró correctamente'
              });
              categoriaForm.reset();

              
            },
            error =>{
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error en el sistema'
              });
            }
          )
        },
        error =>{
          Swal.fire({
            icon: 'warning',
            title: 'Advertencia',
            text: 'La categoría ya existe, verifique en la tabla'
          });
        }

      )
    }
  }

  eliminar_registro(_id: any){
    Swal.fire({
      title: '¿Eliminar producto?',
      text: "Esta acción no se podrá revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Producto Eliminado',
          'El producto se eliminó correctamente',
          'success'
        )
        // Elimina el producto
        this._productoService.eliminar_producto(_id).subscribe(
          response =>{
            // Actualiza la tabla después de borrar el producto
            this._productoService.get_productos('').subscribe(
              response =>{
                this.productos = response.productos;
              },
              error =>{

              }
            )
          },
          error =>{

          }
        )
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'El producto no se ha eliminado',
          'error'
        )
      }
    })
  }

  get_id(id: any){
    this.producto_id = id;
  }

  actualizar_stock(stockForm: any){
    if(stockForm.valid){
      if(this.producto_id){
        this._productoService.editar_stock({
          _id: this.producto_id,
          stock: stockForm.value.producto_stock
        }).subscribe(
          response =>{
            Swal.fire({
              icon: 'success',
              title: 'Hecho!',
              text: 'Las existencias se actualizaron correctamente'
            });
            stockForm.reset();
            this._productoService.get_productos('').subscribe(
              response =>{
                this.productos = response.productos;
              },
              error =>{

              }
            )
          },
          error =>{
            console.log(error);
          }
        )
      }
    }
  }

}

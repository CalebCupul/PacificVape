import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { ProductoService } from 'src/app/services/producto.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { VentaService } from '../../../services/venta.service';
import { DetalleVenta } from 'src/app/models/DetalleVenta';
import { Venta } from 'src/app/models/Venta';
import { GLOBAL } from 'src/app/services/GLOBALS';


@Component({
  selector: 'app-venta-create',
  templateUrl: './venta-create.component.html',
  styleUrls: ['./venta-create.component.css']
})
export class VentaCreateComponent implements OnInit {


  public p: number = 1;
  public identity: any;
  public clientes: any;
  public productos: any;
  public producto: any = { 
    stock: '--|--',
}
  public data_detalle : Array<any> = [];
  public detalle : any = {
    idproducto : ''
  };
  public venta : any = {
    idcliente: '',
  };
  public total: any = 0;
  public url: any;


  constructor(
    private _userService: UserService,
    private _clienteService: ClienteService,
    private _productoService: ProductoService,
    private _ventaService: VentaService,
    private _router: Router
  ) {
    this.identity = this._userService.getIdentity();
    this.url = GLOBAL.url;
   }

  ngOnInit(): void {
    if(this.identity){

      this._clienteService.get_clientes('').subscribe(
        response =>{
          this.clientes = response.clientes;
        },
        error =>{

        }
      );

      this._productoService.get_productos('').subscribe(
        response =>{
          console.log(response)
          this.productos = response.productos;
        },
        error =>{

        }
      );
    }else{
      this._router.navigate(['']);
    }
  }

  get_data_producto(id: any){
    this._productoService.get_producto(id).subscribe(
      response =>{
        this.producto = response.producto;
      },
      error =>{

      }
    )
  }

  save_detalle(detalleForm: any){
    if(detalleForm.valid){
      if(detalleForm.value.cantidad <= this.producto.stock){
        this.data_detalle.push({
          id_producto : detalleForm.value.idproducto,
          cantidad: detalleForm.value.cantidad,
          producto: this.producto.titulo,
          precio_venta: this.producto.precio_venta,
          imagen: this.producto.imagen
        });

        
        this.detalle = new DetalleVenta('','',null);
        console.log(this.data_detalle);
        this.producto.stock = '--|--',
        this.detalle.idproducto = '';
        

        this.total = this.total + (parseInt(this.producto.precio_venta) * parseInt(detalleForm.value.cantidad));
        console.log( this.total);
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El producto no tiene suficientes existencias'
        });
      }
  }else{
    Swal.fire({
      icon: 'warning',
      title: 'Advertencia',
      text: 'Complete todos los campos'
    });
  }
  }

  onSubmit(ventaForm: any){
    if(ventaForm.valid){
      if(ventaForm.value.idcliente != ''){
        let data = {
          id_cliente: ventaForm.value.idcliente,
          id_user: this.identity._id,
          detalles: this.data_detalle,
          total: this.total
        }
        Swal.fire({
          icon: 'success',
          title: 'Hecho!',
          text: 'La venta se registró correctamente'
        });
        console.log(data);

        this._ventaService.save_data(data).subscribe(
          response =>{
            this._router.navigate(['venta']);
          },
          error=>{
            console.log(error);
          }
        );
        
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al registrar la venta'
        });
      }
      
    }else{
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Complete todos los campos'
      });
      
    }
  }
  

  eliminar(idx: any, precio_venta: any, cantidad: any){
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
        this.data_detalle.splice(idx,1);
        this.total= this.total - (parseInt(precio_venta)*parseInt(cantidad));
        Swal.fire(
          'Producto Eliminado',
          'El producto se eliminó correctamente',
          'success'
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
}

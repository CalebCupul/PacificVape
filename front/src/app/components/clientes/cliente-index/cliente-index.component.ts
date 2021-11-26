import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-index',
  templateUrl: './cliente-index.component.html',
  styleUrls: ['./cliente-index.component.css']
})
export class ClienteIndexComponent implements OnInit {

  public clientes: any;
  public p: number = 1;
  public url: any;
  public filtro: any;
  public identity: any;
  
  constructor(
    private _clientService: ClienteService,
    private _userService: UserService,
    private _router: Router
  ) {
    this.identity = _userService.getIdentity();
   }

  ngOnInit(): void {
    if(this.identity){
      this._clientService.get_clientes('').subscribe(
        response =>{
          this.clientes = response.clientes;
          console.log(this.clientes);
        },
        error =>{
  
        }
      )
    }else{
      this._router.navigate(['']);
    }
  }

  eliminar(id: any){
    Swal.fire({
      title: '¿Eliminar cliente?',
      text: "Esta acción no se podrá revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Cliente liminado',
          'El cliente se eliminó correctamente',
          'success'
        )
          // Elimina el cliente
        this._clientService.eliminar_cliente(id).subscribe(
          Response =>{
            // Actualiza la tabla después de borrar el cliente
            this._clientService.get_clientes('').subscribe(
              Response =>{
                this.clientes = Response.clientes;
              },
              error =>{

              }
            )
          },
          error =>{

          }
        );
        
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'El cliente no se ha eliminado',
          'error'
        )
      }
    })
  }

  search(searchForm: any){
    this._clientService.get_clientes(searchForm.value.filtro).subscribe(
      response =>{
        this.clientes = response.clientes;
        console.log(response);
      },
      error =>{

      }
    )
  }

}

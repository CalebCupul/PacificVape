import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GLOBAL } from 'src/app/services/GLOBALS';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.css']
})
export class UserIndexComponent implements OnInit {

  public url;
  public p: number = 1;
  public usuarios: any;
  public identity: any;

  constructor(
    private _userService: UserService,
    private _router: Router
  ) {
    this.url = GLOBAL.url;
    this.identity = _userService.getIdentity();
   }

  ngOnInit(): void {
    // Si el usuario tiene los permisos de administrador, le muestra el modulo de Usuarios
    if(this.identity.role === 'ADMIN'){
      this._userService.get_users().subscribe(
        response =>{
          this.usuarios = response.usuarios;
        },
        error =>{
  
        }
      )
    }else{
      // Si no tiene los permisos de administrador, lo redirecciona al Dashboard
      this._router.navigate(['dashboard']);
    }
  }

  eliminar(id: any){
    Swal.fire({
      title: '¿Eliminar usuario?',
      text: "Esta acción no se podrá revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Usuario eliminado',
          'El usuario se eliminó correctamente',
          'success'
        )
          // Elimina el cliente
        this._userService.eliminar_user(id).subscribe(
          Response =>{
            // Actualiza la tabla después de borrar el cliente
            this._userService.get_users().subscribe(
              Response =>{
                this.usuarios = Response.usuarios;
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
          'El usuario no se ha eliminado',
          'error'
        )
      }
    })
  }

}

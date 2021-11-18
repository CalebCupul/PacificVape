import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GLOBAL } from 'src/app/services/GLOBALS';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget | null;
}

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  public id: any;
  public user: any
  public file: any;
  public imgSelect: any;
  public password: any;
  public url: any;
  public identity: any;

  constructor(
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _router: Router
  ) {
    this.url = GLOBAL.url;
    this.identity = _userService.getIdentity();
   }

  ngOnInit(): void {
        // Si el usuario tiene los permisos de administrador, le muestra el modulo de Usuarios
    if(this.identity.role === 'ADMIN'){
      this._route.params.subscribe(params=>{
        this.id = params['id'];
        
        this._userService.get_user(this.id).subscribe(
          response =>{
            console.log(response);
            this.user = response.user;
          },
          error=>{
  
          }
        )
      })
    }else{
            // Si no tiene los permisos de administrador, lo redirecciona al Dashboard
      this._router.navigate(['dashboard']);
    }
  }

  onSubmit(userForm:any){
    if(userForm.valid){
      this._userService.editar({
        _id: this.id,
        nombre: userForm.value.nombre,
        email: userForm.value.email,
        telefono: userForm.value.telefono,
        role: userForm.value.role,
        imagen: this.file,
        img_name: this.user.imagen
      }).subscribe(
        response =>{
          Swal.fire({
            icon: 'success',
            title: 'Hecho!',
            text: 'El usuario se actualizó correctamente'
          });
          console.log(response);
        },
        error =>{
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error en el servidor'
          });
        }
      )
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

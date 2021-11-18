import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  public user: any;
  public file: any;
  public imgSelect: any;
  public identity: any;

  constructor(
    private _userService: UserService,
    private _router: Router,
  ) { 
    this.user = new User('','','',1,'','','');
    this.identity = _userService.getIdentity();
  }

  ngOnInit(): void {
    if(this.identity.role === 'ADMIN'){

    }else{
      this._router.navigate(['dashboard']);
    }
  }

  onSubmit(userForm: any){
    if(userForm.valid){
      this._userService.insertar_usuario({
        password: userForm.value.password,
        nombre: userForm.value.nombre,
        email: userForm.value.email,
        telefono: userForm.value.telefono,
        img: this.file,
        role: userForm.value.role
      }).subscribe(
        Response =>{
          Swal.fire({
            icon: 'success',
            title: 'Hecho!',
            text: 'El usuario se registró correctamente'
          });
          console.log(Response);
          this.user = new User('','','',1,'','','');
          this.imgSelect = '../../../../assets/img/null-user.jpg';
          userForm.reset();
        },
        error =>{
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El usuario ya se encuentra registrado'
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

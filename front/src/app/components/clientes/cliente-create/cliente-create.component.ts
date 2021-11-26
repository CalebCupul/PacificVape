import { CompileIdentifierMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { Producto } from '../../../models/Producto';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {
  
  public cliente: Cliente;
  public identity: any;

  constructor(
    private _clienteService: ClienteService,
    private _userService: UserService,
    private _router: Router
  ) { 
    this.cliente = new Cliente('','','','',null);
    this.identity = _userService.getIdentity();
  }

  ngOnInit(): void {
    if(this.identity){

    }else{
      this._router.navigate(['']);
    }
  }

  onSubmit(clienteForm: any){
    if(clienteForm.valid){
      this._clienteService.insertar_cliente({
        nombres: clienteForm.value.nombres,
        ine: clienteForm.value.identificacion,
        correo: clienteForm.value.correo,
        telefono: clienteForm.value.telefono
      }).subscribe(
        response =>{
          Swal.fire({
            icon: 'success',
            title: 'Hecho!',
            text: 'El cliente se registró correctamente'
          });
          this.cliente = new Cliente('','','','',null);
        },
        error =>{
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'La identificación ya se encuentra registrada con otro cliente'
          });
        }
      )
    }else{
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Completa todos los campos antes de registrar un cliente'
      });
    }
  }

}

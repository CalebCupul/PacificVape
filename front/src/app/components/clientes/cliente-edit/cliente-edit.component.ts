import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-edit',
  templateUrl: './cliente-edit.component.html',
  styleUrls: ['./cliente-edit.component.css']
})
export class ClienteEditComponent implements OnInit {

  public id: any;
  public cliente: any = {};

  constructor(
    private _route: ActivatedRoute,
    private _clienteService: ClienteService
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(
      response =>{
        this.id = response['id'];

        this._clienteService.get_cliente(this.id).subscribe(
          response =>{
            console.log(response);
            this.cliente = response.cliente;
          },
          error =>{

          }
        );
      }
    );
  }

  onSubmit(clienteForm: any){
    if(clienteForm.valid){
      this._clienteService.editar_cliente({
        _id: this.id,
        nombres: clienteForm.value.nombres,
        identificacion: clienteForm.value.identificacion,
        correo: clienteForm.value.correo,
        telefono: clienteForm.value.telefono
      }).subscribe(
        Response =>{
          Swal.fire({
            icon: 'success',
            title: 'Hecho!',
            text: 'El cliente se actualizó correctamente'
          });

        },
        error =>{
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ha ocurrido un error'
          });
        }
      );
    }
  }

}

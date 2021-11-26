import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBALS';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  public url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = GLOBAL.url;
   }

   get_clientes(filtro: string): Observable<any>{
    let header = new HttpHeaders().set('content-Type', 'application/json');
    return this._http.get(this.url + 'cliente/' + filtro, { headers: header });
  }

  insertar_cliente(data: any): Observable<any>{
    let header = new HttpHeaders().set('content-Type', 'application/json');
    return this._http.post(this.url + 'cliente/registrar', data, { headers: header });
  }

  get_cliente(id: any): Observable<any>{
    let header = new HttpHeaders().set('content-Type', 'application/json');
    return this._http.get(this.url + 'cliente/registro/'+id, { headers: header });
  }
  
  editar_cliente(data: any): Observable<any>{
    let header = new HttpHeaders().set('content-Type', 'application/json');
    return this._http.put(this.url + 'cliente/editar/'+ data._id, data, { headers: header });
  }

  eliminar_cliente(id: any): Observable<any>{
    let header = new HttpHeaders().set('content-Type', 'application/json');
    return this._http.delete(this.url + 'cliente/eliminar/'+id, { headers: header });
  }

}

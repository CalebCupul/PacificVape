import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBALS';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  public url: any;

  constructor(
    private _http: HttpClient
  ) { 
    this.url = GLOBAL.url;
  }

  get_ventas(): Observable<any>{
    let header = new HttpHeaders().set('content-Type', 'application/json');
    return this._http.get(this.url + 'venta', { headers: header });
  }

  save_data(data: any): Observable<any>{
    let header = new HttpHeaders().set('content-Type', 'application/json');
    return this._http.post(this.url + '/venta/registrar', data, { headers: header });
  }

  data_venta(id: any): Observable<any>{
    let header = new HttpHeaders().set('content-Type', 'application/json');
    return this._http.get(this.url + 'venta/datos/'+id, { headers: header });
  }
}

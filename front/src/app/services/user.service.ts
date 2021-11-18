import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './GLOBALS';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url;
  public user;
  public token: any;
  public identity: any;

  constructor(
    private _http: HttpClient,
  ) {

    this.url = GLOBAL.url;
    this.user = new User('','','',1,'','','');

   }


   login( user:any, getToken = null):Observable<any>{

    let json = user;

    if(getToken != null){
      user.gettoken = true
    }

    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'login', json, { headers: headers});

   }

   getToken():Observable<any>{
    let token = localStorage.getItem('token');
    if(token){
      this.token = token;
    }else{
      this.token = null;
    }

    return this.token;
   }

   getIdentity():Observable<any>{
    let identity = JSON.parse(localStorage.getItem('identity')!);
    if(identity){
      this.identity = identity;
    }else{
      this.identity = null;
    }
    return this.identity;
   }

   insertar_usuario(data: any){
    const fd = new FormData();
    fd.append('nombre', data.nombre);
    fd.append('password', data.password);
    fd.append('email', data.email);
    fd.append('imagen', data.img);
    fd.append('telefono', data.telefono);
    fd.append('role', data.role);

    return this._http.post(this.url + 'registrar', fd);
   }

   get_users():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'usuarios', { headers: headers});
   }

   registrar(data: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'registrar', data , { headers: headers});
   }

   get_user(id: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'user/'+id, { headers: headers});
   }

   editar(data: any){
    const fd = new FormData();
    fd.append('nombre', data.nombre);
    fd.append('password', data.password);
    fd.append('imagen', data.imagen);
    fd.append('email', data.email);
    fd.append('telefono', data.telefono);
    fd.append('role', data.role);

    return this._http.put(this.url + 'user/editar/'+data._id+'/'+data.img_name, fd);
   }

   eliminar_user(id: any): Observable<any>{
    let header = new HttpHeaders().set('content-Type', 'application/json');
    return this._http.delete(this.url + 'user/eliminar/'+id, { headers: header });
  }
}

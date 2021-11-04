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
  // public token;
  // public identity;

  constructor(
    private _http: HttpClient,
  ) {

    this.url = GLOBAL.url;
    this.user = new User('','','','','','','');

   }


   login( user:any, getToken = null):Observable<any>{

    let json = user;

    if(getToken != null){
      user.gettoken = true
    }

    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'login', json, { headers: headers});

   }

   getToken(){

   }

   getIdentyty(){

   }
}

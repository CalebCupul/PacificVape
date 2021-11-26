import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './GLOBALS';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  public url: any;

  constructor(
    private _http: HttpClient
  ) {
    this.url = GLOBAL.url;
   }

   get_productos(filtro: string): Observable<any>{
     let header = new HttpHeaders().set('content-Type', 'application/json');
     return this._http.get(this.url + 'producto/' + filtro, { headers: header });

   }

   get_categorias():Observable<any>{
    let header = new HttpHeaders().set('content-Type', 'application/json');
    return this._http.get(this.url + 'categorias/', { headers: header });
   }

   insertar_producto(data: any){
    const fd = new FormData();
    fd.append('titulo', data.titulo);
    fd.append('marca', data.marca);
    fd.append('imagen', data.imagen);
    fd.append('descripcion', data.descripcion);
    fd.append('precio_compra', data.precio_compra);
    fd.append('precio_venta', data.precio_venta);
    fd.append('stock', data.stock);
    fd.append('id_categoria', data.id_categoria);

    return this._http.post(this.url + 'producto/registrar', fd);
   }

   get_producto(id: any): Observable<any>{
    let header = new HttpHeaders().set('content-Type', 'application/json');
    return this._http.get(this.url + 'producto/registro/' + id, { headers: header });

  }

  actualizar_producto(data: any){
    const fd = new FormData();
    fd.append('titulo', data.titulo);
    fd.append('marca', data.marca);
    fd.append('imagen', data.imagen);
    fd.append('descripcion', data.descripcion);
    fd.append('precio_compra', data.precio_compra);
    fd.append('precio_venta', data.precio_venta);
    fd.append('id_categoria', data.id_categoria);

    return this._http.put(this.url + 'producto/editar/'+data._id+'/'+data.img_name, fd);
   }
  
   insertar_categoria(data: any): Observable<any>{
    let header = new HttpHeaders().set('content-Type', 'application/json');
    return this._http.post(this.url + 'categoria/registrar' , data , { headers: header });
  }

  eliminar_producto(_id: any): Observable<any>{
    let header = new HttpHeaders().set('content-Type', 'application/json');
    return this._http.delete(this.url + 'producto/' + _id, { headers: header });

  }

  editar_stock(data: any): Observable<any>{
    let header = new HttpHeaders().set('content-Type', 'application/json');
    return this._http.put(this.url + 'producto/stock/' + data._id, data, { headers: header });

  }
}

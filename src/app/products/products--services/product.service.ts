import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl: string = environment.apiProducts;

  constructor(
    private http: HttpClient
  ) { }

  getAllCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories`);
  }
  //Obtenemos el listado de todos los producto
  getAllProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }


}

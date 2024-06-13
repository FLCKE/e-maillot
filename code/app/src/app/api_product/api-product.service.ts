import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiProductService {

  // Injection du service HttpClient dans le constructeur
  constructor(private _http: HttpClient) { }

  // Variable pour stocker l'URL de l'API
  public apiUrl!: string;

  // Méthode pour obtenir un utilisateur en utilisant une URL spécifiée
  getProduct(): Observable<any> {
    return this._http.get(`http://localhost:5002/api/products/`);
  }
  getProductById(id:number): Observable<any>{
    return this._http.get(`http://localhost:5002/api/products/${id}`);
  }
}

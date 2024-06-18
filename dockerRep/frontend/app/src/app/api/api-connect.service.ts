import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiConnectService {

  // Injection du service HttpClient dans le constructeur
  constructor(private _http: HttpClient) { }

  // Variable pour stocker l'URL de l'API
  public apiUrl!: string;

  // Méthode pour obtenir un utilisateur en utilisant une URL spécifiée
  getUser(link: string): Observable<any> {
    return this._http.get(`${link}`);
  }

  // Méthode pour obtenir un utilisateur par son ID en utilisant une URL spécifiée
  getUserById(link: string): Observable<any> {
    return this._http.get(`${link}`);
  }

  // Méthode pour ajouter un nouvel utilisateur en envoyant une requête POST à l'API
  addUser(newUser: any): Observable<any> {
    this.apiUrl = 'http://localhost:5000/api/users/';
    return this._http.post(this.apiUrl, newUser);
  }

  // Méthode pour mettre à jour un utilisateur existant en envoyant une requête POST à l'API
  updateUser(newUser: any, user_id: Number): Observable<any> {
    this.apiUrl = 'http://localhost:5000/api/users/' + user_id;
    return this._http.put(this.apiUrl, newUser);
  }
  addToCart(newproduct: any): Observable<any> {
    this.apiUrl = 'http://localhost:5000/api/cart/';
    return this._http.post(this.apiUrl, newproduct);
  }
  getCart(user_id: number): Observable<any> {
    this.apiUrl = 'http://localhost:5000/api/cart/' + user_id;
    return this._http.get(this.apiUrl);
  }
  deleteCartLine(cardId: number): Observable<any> {
    this.apiUrl = 'http://localhost:5000/api/cart/' + cardId;
    return this._http.delete(this.apiUrl);
  }
  deleteCart(userId: number): Observable<any> {
    this.apiUrl = 'http://localhost:5000/api/cart/clear/' + userId;
    return this._http.delete(this.apiUrl);
  }
  getAllCommand(userId: number): Observable<any> {
    console.log(userId);
    this.apiUrl = 'http://localhost:5000/api/command/' + userId;
    return this._http.get(this.apiUrl);
  }

  // Méthode pour déconnecter l'utilisateur en supprimant ses informations d'authentification du localStorage
  logout() {
    localStorage.removeItem("AuthUser");
  }
}

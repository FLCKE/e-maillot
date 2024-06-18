import { Component, OnInit } from '@angular/core';
import { ApiConnectService } from '../api/api-connect.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit {
  constructor(private apiservice: ApiConnectService, private router: Router) {

  }
  ngOnInit(): void {
    this.getUserData();
    if (!this.userData) {
      this.router.navigate(['/login']);
    }
  }
  userData: any;
  public getUserData() {
    const data = localStorage.getItem('AuthUser');
    if (typeof localStorage !== 'undefined') {
      this.userData = localStorage.getItem("AuthUser");
      this.userData = JSON.parse(this.userData);  // Conversion de la chaîne JSON en objet JavaScript
    }
    console.log("eeeeeeeee");
    if (this.userData) {
      console.log(this.userData);
    }
  }
  public logout() {
    localStorage.removeItem("AuthUser");
    window.location.reload();  // Recharge la page pour effectuer la déconnexion

  }
  public updateUser() {
    let email = document.getElementById('email') as HTMLInputElement;
    let username = document.getElementById('username') as HTMLInputElement;
    let firstname = document.getElementById('firstname') as HTMLInputElement;
    let lastname = document.getElementById('lastname') as HTMLInputElement;

    const newUserData = {
      email: email.value,
      username: username.value,
      firstname: firstname.value,
      lastname: lastname.value,
    };

    if (newUserData) {
      // Appel du service backend pour mettre à jour l'utilisateur via une API
      this.apiservice.updateUser(newUserData, this.userData.user_id).subscribe({
        next: (result) => {
          this.logout();
          window.location.href = "/profil";

          console.log(result);  // Affichage du résultat de la mise à jour dans la console
          // Redirection vers la page de connexion après la mise à jour
        },
        error: (err) => {
          // Gestion des erreurs potentielles lors de la mise à jour
        }
      });
    }
  }
}

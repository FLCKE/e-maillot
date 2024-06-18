import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiConnectService } from '../api/api-connect.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.css'
})
export class SubscribeComponent {

  constructor(private apiservice: ApiConnectService, private router: Router) { }

  /**
   * addUser
   * Récupère les données d'inscription de l'utilisateur et appelle le service backend pour ajouter un nouvel utilisateur.
   */
  public addUser() {
    console.log("eeeeeeeeeeeeeeeeeee");
    // Récupération des valeurs des champs d'entrée
    let email = document.getElementById('email') as HTMLInputElement;
    let firstname = document.getElementById('firstname') as HTMLInputElement;
    let lastname = document.getElementById('lastname') as HTMLInputElement;
    let username = document.getElementById('user_name') as HTMLInputElement;
    let password = document.getElementById('password') as HTMLInputElement;

    // Créer un nouvel objet Date avec la date et l'heure actuelles
    const now = new Date();

    // Formater la date
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Les mois sont indexés à partir de 0
    const day = String(now.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;

    // Formater l'heure
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;

    // Afficher la date et l'heure
    console.log(`${dateString} ${timeString}`); // Exemple: 2023-06-11 12:34:56
    // Création d'un objet contenant les données de l'utilisateur
    const newUserData = {
      email: email.value,
      lastname: lastname.value,
      firstname: firstname.value,
      username: username.value,
      password: password.value,
      registrationDate: `${dateString} ${timeString}`,
      role: "user"
    };
    console.log(newUserData);
    // Vérification que les données de l'utilisateur sont valides
    if (newUserData.email && newUserData.firstname && newUserData.lastname && newUserData.username && newUserData.password) {
      // Appel au service backend pour ajouter un nouvel utilisateur
      this.apiservice.addUser(newUserData).subscribe({
        next: (result) => {
          // Redirection vers la page de connexion en cas de succès
          // this.router.navigateByUrl('/login');
          console.log("utilisateur ajouter");
        },
        error: (err) => {
          // Affichage des erreurs en cas d'échec
          console.error('Erreur lors de l\'inscription:', err);
        }
      });
    } else {
      // Affichage d'un message d'erreur si les données sont invalides
      console.error('Les données d\'inscription sont invalides.');
    }
  }
  public printR() {
    console.log("louissssss");
  }
}

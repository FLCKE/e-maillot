import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserComponent } from '../model/user/user.component';
import { ApiConnectService } from '../api/api-connect.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public errorMessage!: string; // Variable pour stocker les messages d'erreur
  public user!: UserComponent; // Variable pour stocker les informations de l'utilisateur
  public userAuthentificate!: boolean; // Variable pour indiquer si l'utilisateur est authentifié

  constructor(private apiservice: ApiConnectService, private router: Router) {
    // Constructeur injectant le service BackendService et le Router Angular
  }

  /**
   * Méthode pour gérer la connexion de l'utilisateur
   */
  public login() {
    console.log("Tentative de connexion...");

    // Récupération des valeurs des champs email et password
    let email: HTMLInputElement = document.getElementById('email') as HTMLInputElement;
    let password: HTMLInputElement = document.getElementById('password') as HTMLInputElement;
    console.log(email.value, password.value);

    // URL de l'API pour la connexion
    let loginUrl = "http://localhost:5000/api/users/login" + "?email=" + email.value + "&password=" + password.value;

    // Appel à l'API pour tenter de se connecter avec les informations fournies
    this.apiservice.getUser(loginUrl).subscribe({
      next: (result) => {
        console.log("Connexion réussie, données récupérées");
        console.log(result);
        this.user = result.data[0]; // Affecter les informations récupérées à l'utilisateur
        this.authentificateUser(); // Authentifier l'utilisateur et enregistrer ses informations dans le storage local

        if (this.userAuthentificate) {
          // Redirection vers la page d'accueil si l'utilisateur est authentifié
          window.location.href = "/home";
          this.router.navigate(["/home"]);
          console.log("connect user verify")
        }
      },
      error: (Error) => {
        console.log(Error);
        this.errorMessage = "Mot de passe ou email incorrect"; // Afficher un message d'erreur en cas d'échec de la connexion
      }
    });
  }

  /**
   * Méthode pour authentifier l'utilisateur et stocker ses informations
   */
  public authentificateUser() {
    this.userAuthentificate = true;
    // Stocker les informations de l'utilisateur dans le localStorage
    localStorage.setItem("AuthUser", JSON.stringify({
      user_id: this.user.userid,
      user_name: this.user.username,
      user_email: this.user.email,
      firstname: this.user.firstname,
      lastname: this.user.lastname,
    }));
  }
}

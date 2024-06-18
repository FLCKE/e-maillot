import { Component, OnInit } from '@angular/core';
import { ApiConnectService } from '../api/api-connect.service';
import { ApiProductService } from '../api_product/api-product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Products } from '../model/products/products';
@Component({
  selector: 'app-command',
  templateUrl: './command.component.html',
  styleUrl: './command.component.css'
})
export class CommandComponent implements OnInit {
  constructor(private apiUser: ApiConnectService, private apiservice: ApiProductService, private router: Router, private route: ActivatedRoute) {
    // Constructeur injectant le service BackendService et le Router Angular
  }
  userData: any;
  commandData: {
    commandId: number,
    userId: number,
    productId: number,
    deliveryDate: Date,
    countOfProdInCom: number,

  }[] = [];
  commandAllData: {
    product: Products,
    commandId: number,

  }[] = [];
  ngOnInit(): void {
    if (!this.userData) {
      this.router.navigate(['/login']);
    }
    this.getUserData();
    if (this.userData) {
      this.getAllCommandUser(this.userData.user_id);
    }
  }
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
  /**
   * getAllCommandUser
userid:number   */
  public getAllCommandUser(userId: number) {

    this.apiUser.getAllCommand(userId).subscribe({
      next: (result) => {
        this.commandData = result;
        this.getAllCommand();
      }
    })
  }
  public getAllCommand() {
    for (let x of this.commandData) {

      this.apiservice.getProductById(x.productId).subscribe({
        next: (result) => {

          let product = result;
          this.commandAllData.push({ product: product, commandId: x.commandId });
          console.log(this.commandAllData);
        }
      })
    }


  }
}

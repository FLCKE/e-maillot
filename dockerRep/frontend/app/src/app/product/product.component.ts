import { Component, OnInit } from '@angular/core';
import { ApiProductService } from '../api_product/api-product.service';
import { ApiConnectService } from '../api/api-connect.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Products } from '../model/products/products';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  constructor(private apiUser: ApiConnectService, private apiservice: ApiProductService, private router: Router, private route: ActivatedRoute) {
    // Constructeur injectant le service BackendService et le Router Angular
  }
  product!: Products;
  userData: any;
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const produitId = params['id'];
      this.getProductById(produitId);
      this.getUserData();

      // Utilisez produitId pour récupérer les données du produit
    });
  }
  /**
   * getProductById
   */
  public getProductById(id: number) {
    this.apiservice.getProductById(id).subscribe({
      next: (result) => {
        this.product = result;
        console.log(this.product);
      }
    })
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
   * addProductToCart
   */
  public addProductToCart(productID: number) {
    if (!this.userData) {
      this.router.navigate(['/login']);
      window.location.href = "/login";
    }
    let quantities: HTMLInputElement = document.getElementById('quantity') as HTMLInputElement;
    console.log(quantities.value);
    if (quantities.value) {
      const newproduct = {
        productId: productID,
        userId: this.userData.user_id,
        quantity: quantities.value,
      }
      this.apiUser.addToCart(newproduct).subscribe({
        next: (result) => {
          console.log(result);
        }
      })
    }

  }
}

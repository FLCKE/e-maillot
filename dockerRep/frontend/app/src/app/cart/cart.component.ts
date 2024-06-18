import { Component, OnInit } from '@angular/core';
import { ApiConnectService } from '../api/api-connect.service';
import { ApiProductService } from '../api_product/api-product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Products } from '../model/products/products';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  constructor(private apiUser: ApiConnectService, private apiservice: ApiProductService, private router: Router, private route: ActivatedRoute) {
    // Constructeur injectant le service BackendService et le Router Angular
  }
  userData: any;
  product!: Products;
  totals: number = 0;
  cartAllData: {
    productd: Products,
    cartId: number,
    quantity: number,

  }[] = [];
  cartData: {
    cartId: number,
    userId: number,
    productId: number,
    quantity: number,
  }[] = [];
  ngOnInit(): void {
    if (!this.userData) {
      this.router.navigate(['/login']);
    }
    this.getUserData();
    this.getUserCart(this.userData.user_id);

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
   * getUserCart
   */
  public getUserCart(userId: number) {
    this.apiUser.getCart(userId).subscribe({
      next: (result) => {
        this.cartData = result
        console.log(this.cartData);
        this.getAllCart();
      }
    })

  }
  public getAllCart() {
    for (let x of this.cartData) {

      this.apiservice.getProductById(x.productId).subscribe({
        next: (result) => {

          this.product = result;
          this.totals += x.quantity * this.product.Price;
          this.cartAllData.push({ productd: this.product, cartId: x.cartId, quantity: x.quantity });
          console.log(this.cartAllData);
        }
      })
    }


  }
  /**
   * deleteCartLine
   */
  public deleteCartLine(cardId: number) {
    this.apiUser.deleteCartLine(cardId).subscribe({
      next: (result) => {
        console.log(result);
        window.location.reload();
      }
    })
  }
  public deleteCart() {
    this.apiUser.deleteCart(this.userData.user_id).subscribe({
      next: (result) => {
        console.log(result);
        window.location.reload();
      }
    })
  }

}

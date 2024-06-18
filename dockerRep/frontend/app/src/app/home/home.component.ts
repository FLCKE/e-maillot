import { Component, OnInit } from '@angular/core';
import { ApiProductService } from '../api_product/api-product.service';
import { Router } from '@angular/router';
import { Products } from '../model/products/products';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private apiservice: ApiProductService, private router: Router) {
    // Constructeur injectant le service BackendService et le Router Angular
  }
  allProduct: Products[] = [];
  email='emaillotsupport@gmail.com';
  ngOnInit(): void {
    this.getAllProduct();
  }
  /**
   * getAllProduct
   */
  public getAllProduct() {
    this.apiservice.getProduct().subscribe({
      next: (result) => {
        this.allProduct = result;
        console.log(this.allProduct);
      }
    })
  }
 

}

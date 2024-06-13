import { Component } from '@angular/core';
import { Products } from '../model/products/products';
import { ApiProductService } from '../api_product/api-product.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.css'
})
export class CatalogueComponent {
  constructor(private apiservice: ApiProductService) {
    // Constructeur injectant le service BackendService et le Router Angular
  }

  products: Products[] = [];
  ngOnInit(): void {
    this.getProducts();
  }

  /**
   * getAllCommandUser
userid:number   */
  public getProducts() {
    this.apiservice.getProduct().subscribe({
      next: (result) => {

        this.products = result;

      }
    })
  }
}

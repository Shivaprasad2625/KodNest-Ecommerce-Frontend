import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = 1;
  searchMode: boolean = false;

  constructor(private productService: ProductService,
    private cartService:  CartService,
    private route: ActivatedRoute) { }



  ngOnInit() {
    // this.route.paramMap.subscribe(() => {
    this.listProducts();
    // });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.handleSearchProducts();
    }
    else{
      this.handleListProducts();
    }
  }
  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;
    this.productService.searchProducts(theKeyword).subscribe(
      data =>{
      this.products = data;
      }
    );
  }

  // listProducts() 
  // {
  //   //check if "id" parameter is available
  //   const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id')
  //   if(hasCategoryId){
  //     //get the "id" param string. convert string to a number using the '+' symbol
  //     this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
  //   }
  //   else{
  //     //no categroy is available... default to category id 1
  //     this.currentCategoryId = 1; 
  //   }

  //   //now get the products for the given category id
  //   this.productService.getProductList(this.currentCategoryId).subscribe(
  //     data =>{ 
  //       this.products = data;
  //     }
  //   )

  //}  

  handleListProducts(){
    
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id')
    if (hasCategoryId) {
      //get the "id" param string. convert string to a number using the '+' symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else {
      //no categroy is available... default to category id 1
      this.currentCategoryId = 1;
    }

    //now get the products for the given category id
    this.productService.getProductList(this.currentCategoryId).subscribe(
      (data: any) => {
        console.log('Prodcut List', data?._embedded?.products);
        this.products = data?._embedded?.products;
      }
    )
  }

  addToCart(theProduct: Product){
    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);
    const theCartItem = new CartItem(theProduct);
    this.cartService.addToCart(theCartItem);
  }

}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8081/api/products';
  private categoryUrl = 'http://localhost:8081/api/productCategories';

  constructor(private httpClient: HttpClient) { }

  getProduct(theProductId: number): Observable<Product> {
    const productUrl = `${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<GetResponseProducts>(productUrl).pipe(
      (response: any) => {        
        return response
      }
    );
  }

   
  // getProductListPaginate(thePage: number,
  //                       thePageSize:number,
  //                       theCategoryId: number): Observable<GetResponseProducts[]> {
  //   // need to build URL based on category id, page and size
  //   const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
  //                     +`&page=${thePage}&size=${thePageSize}`;
  //   return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
  //     (response: any) => {
  //       return this.httpClient.get<GetResponseProducts>())
      
  //     }
  //     //map(response => response._embedded.products)
  //   );
  // }
  
  getProductList(theCategoryId: number): Observable<Product[]> {
    // need to build URL based on category id 
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      (response: any) => {
        return response
      }
      //map(response => response._embedded.products)
    );
  }

  searchProducts(theKeyword: string): Observable<Product[]> {
    // need to build URL based on the keyword 
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      (response: any) => {
        return response
      }
    );
  }


  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      (response: any) => {
        return response
      }
    );
    // return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
    //   map(response => response._embedded.productCategory)
    // );
  }

}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size:number,
    totalElements:number,
    totalPages:number, 
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
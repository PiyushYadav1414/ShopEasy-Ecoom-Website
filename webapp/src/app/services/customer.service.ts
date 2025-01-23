import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../types/product';
import { environment } from '../../environments/environment';
import { Category } from '../types/category';
import { Brand } from '../types/brand';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  private baseUrl = environment.baseUrl;  // Using the base URL from environment


  

  getNewProducts() {
    return this.http.get<Product[]>(`${this.baseUrl}/customer/new-products`);
  }

  getFeaturedProducts() {
    return this.http.get<Product[]>(`${this.baseUrl}/customer/featured-products`);
  }

   getCategories() {
      return this.http.get<Category[]>(`${this.baseUrl}/customer/categories`);
    }

    getProducts(searchTerm: string, categoryId: string, sortBy: string, sortOrder: number, brandId: string, page: number, pageSize: number) {
      return this.http.get<Product[]>(`${this.baseUrl}/customer/products?searchTerm=${searchTerm}&categoryId=${categoryId}&sortBy=${sortBy}&sortOrder=${sortOrder}&brandId=${brandId}&page=${page}&pageSize=${pageSize}`);
    }

    getBrands() {
      return this.http.get<Brand[]>(`${this.baseUrl}/customer/brands`);
    } 
// ***IMPORTANT Below should return single Product (<Product>() not Array of Product (<Product[]>) ***IMPORTANT
    getProductById(id: string) {
      return this.http.get<Product>(`${this.baseUrl}/customer/product/${id}`);
    }
     

  
  
}

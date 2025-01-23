import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';  // Importing the environment file

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.baseUrl;  // Using the base URL from environment

  constructor(private http: HttpClient) { }

  // API calls using the baseUrl
  getProducts() {
    return this.http.get(`${this.baseUrl}/product`);  // Fetch all products
  }

  getProductById(id: string) {
    return this.http.get(`${this.baseUrl}/product/${id}`);  // Fetch product by ID
  }

  addProduct(product: any) {
    return this.http.post(`${this.baseUrl}/product`, product);  // Add a new product
  }

  updateProduct(id: string, product: any) {
    return this.http.put(`${this.baseUrl}/product/${id}`, product);  // Update an existing product
  }

  deleteProductById(id: string) {
    return this.http.delete(`${this.baseUrl}/product/${id}`);  // Delete a product by ID
  }
}

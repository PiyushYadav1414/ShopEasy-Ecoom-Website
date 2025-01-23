import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';  // Importing the environment file

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private baseUrl = environment.baseUrl;  // Using the base URL from environment

  constructor(private http: HttpClient) { }

  // API calls using the baseUrl
  getBrands() {
    return this.http.get(`${this.baseUrl}/brand`);  // Uses the base URL for API call
  }

  getBrandById(id: string) {
    return this.http.get(`${this.baseUrl}/brand/${id}`);
  }

  addBrand(name: string) {
    return this.http.post(`${this.baseUrl}/brand`, { name });
  }

  updateBrand(id: string, name: string) {
    return this.http.put(`${this.baseUrl}/brand/${id}`, { name });
  }

  deleteBrandById(id: string) {
    return this.http.delete(`${this.baseUrl}/brand/${id}`);
  }
}

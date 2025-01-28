import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from './types/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  
  constructor(private http: HttpClient) { }
  // What is API ??
  // APIs allow your Angular app (frontend) to request data or send data to your Node.js server (backend).
  // APIs in your code are defined as routes (router.get, router.post, etc.) in Express.


  getCategories() {
    return this.http.get<Category[]>("https://shopeasy-ecoom-website-backend.onrender.com/category");
  }

  getCategoryById(id: string) {
    // Make a GET request to the backend to fetch a category by ID
    return this.http.get<Category>(`https://shopeasy-ecoom-website-backend.onrender.com/${id}`);
  }
  

  addCategory(name: string){
  // return means return the response from backend to component which made the request  
    return this.http.post("https://shopeasy-ecoom-website-backend.onrender.com/category" , {name: name});
  }

  updateCategory(id: string, name: string) {
    return this.http.put(`https://shopeasy-ecoom-website-backend.onrender.com/category/${id}`, { name });
}


  deleteCategoryById(id: string) {
    return this.http.delete(`https://shopeasy-ecoom-website-backend.onrender.com/category/${id}`);
  }
  

 
  



}

import { Component } from '@angular/core';
import { CategoriesService } from 'src/app/categories.service';
import { Router } from '@angular/router';  // Import the Router
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent {
  constructor(private categoryService : CategoriesService, private router : Router,private activeroute: ActivatedRoute){
  }

  name!:string;
  isEdit=false;
  id!: string;

  ngOnInit(){
    this.id = this.activeroute.snapshot.params["id"];
    console.log(this.id);

    if(this.id){
      this.isEdit=true;

      this.categoryService.getCategoryById(this.id).subscribe((result: any) => {
        console.log(result);
        this.name=result.name;
        });
    }
}

  add(){
    console.log(name);
    this.categoryService.addCategory(this.name).subscribe((result: any) => {
        alert("Category added successfully!");
        // Navigate to the categories list page after the category is added
        this.router.navigateByUrl("/admin/categories");
      })
    }

    update() {
      console.log(this.name);  // Log the name of the category
      
      // Assuming you have a service method for updating the category
      this.categoryService.updateCategory(this.id, this.name).subscribe((result: any) => {
        alert('Category updated');
        this.router.navigateByUrl('/admin/categories');  // Navigate to the category list after updating
      });
  }
  

}

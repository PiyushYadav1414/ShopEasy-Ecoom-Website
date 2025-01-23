import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';  // Import the Router
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/categories.service';
import { BrandService } from 'src/app/brand.service';
import { Brand } from 'src/app/types/brand';
import { Category } from 'src/app/types/category';
import { Product } from 'src/app/types/product';



@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  //productForm is the form object that holds all the fields and validation.
  productForm!: FormGroup;
  id!: string;
  isEdit = false;
  productId!: string;
  name!: string;
  brands: any = [];
  categories: Category[] = [];

  // We use formBuilder so that we dont have to write new FormControl() for each field like ('idnumber': new FormControl(null, Validators.required)).
  // So we dont have to write too much code and Adding new controls or groups is faster and requires fewer changes
  // to the structure. Wasim Singh has taught only FormGroup. FormBuilder is optional, but it’s highly recommended for larger forms 
  constructor(private formBuilder: FormBuilder, private productService: ProductService, private router: Router, private activeroute: ActivatedRoute, private categoryService: CategoriesService, private brandService: BrandService) {
    // We use .group with FormBuilder.group because it is a method that creates a FormGroup.A FormGroup is essentially a collection of form controls (inputs, checkboxes, etc.) grouped together.    
    this.productForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(5)]],
      //Validators.minLength(5): The field must have at least 5 characters.
      shortDescription: [null, [Validators.required, Validators.minLength(10)]],
      description: [null, [Validators.required, Validators.minLength(50)]],
      price: [null, [Validators.required]],//Validators.required: The field must not be empty.
      discount: [null],//[null]: The initial/default value of the field (here, it's empty/null).  
      //formBuilder.array([]): Creates an empty list (FormArray) to hold multiple inputs for images.    
      images: this.formBuilder.array([]),
      brandId: [null, [Validators.required]],
      categoryId: [null, [Validators.required]],
      isFeatured: [false],
      isNewProduct: [false]


    });
  }



  ngOnInit() {

    // Fetch categories and brands for dropdown options
    this.categoryService.getCategories().subscribe((result) => {
      this.categories = result;
    });

    this.brandService.getBrands().subscribe((result) => {
      this.brands = result;
    });

    this.id = this.activeroute.snapshot.params["id"];
    console.log(this.id);

    if (this.id) {
      // Set the form to edit mode
      this.isEdit = true;

      // Fetch the product data by ID for editing
      this.productService.getProductById(this.id).subscribe((result: any) => {
        console.log(result);
        // Loop through the images and add them to the form (if there are any)
        for (let index = 0; index < result.images.length; index++) {
          this.addImage();  // Add a new image input field for each image in the product
        }
        // Patch the form with the fetched product data (initialize form with API data)
        this.productForm.patchValue(result as any);
      });
    } else {
      // Add an initial empty image field (if needed)
      this.addImage();
    }




  }




  // Why GET => we have made below method getter so we dont have to treat it like method like have to do images() but we can treat it like a property
  // Instead of writing this long line repeatedly, we define this getter function. Now, we can just write this.images
  get images() {
    // productForm is the main form object which has all form control and its data as they are interconncted 
    // and it also contains a field called images (a FormArray). this.productForm.get('images') gives array of images
    return this.productForm.get('images') as FormArray;
  }


  // The addImage function adds a new field for entering an image URL to the images list.
  addImage() {
    //The new field created by addImage() is added to the FormArray named images, which is already part of the productForm.
    // below code will add a empty filed in array of images and will provide us textbox to enter url of another image  
    this.images.push(this.formBuilder.control(null, Validators.required));
  }


  //This removes the last image field from the images array. 
  removeImage() {
    if (this.images.length > 0) {
      //The removeAt() method is used to remove a control (input field) from a FormArray at a specific index
      //this.images.length gives the total number of controls currently in the images array.Since array indexes start 
      // at 0 (not 1), the last item in the array is at index this.images.length - 1.      
      //If you remove a control, Angular removes the corresponding input field automatically.
      this.images.removeAt(this.images.length - 1);
    }
  }

  // When the form is submitted thne below method will run 
  // When the form is submitted then below method will run 
  addProduct() {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      console.log('Form Data:', this.productForm.value);

      this.productService.addProduct(productData).subscribe(res => {
        console.log('Product Data:', res);
        alert('Product added successfully!');
        this.router.navigate(['/admin/products']);
      },
        error => {
          console.error('Error adding product:', error);
          alert('Error adding product. Please try again.');
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  updateProduct() {
    if (this.productForm.valid && this.id) {
      const productData = this.productForm.value;
      this.productService.updateProduct(this.id, productData).subscribe(res => {
        console.log('Product Updated:', res);
        alert('Product updated successfully!');
        this.router.navigate(['/admin/products']);
      },
        error => {
          console.error('Error updating product:', error);
          alert('Error updating product. Please try again.');
        }
      );
    } else {
      console.log('Form is invalid or product ID is missing');
    }
  }


}


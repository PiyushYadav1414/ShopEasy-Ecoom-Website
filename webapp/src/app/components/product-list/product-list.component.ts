import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Product } from 'src/app/types/product';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/types/brand';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private customerService: CustomerService, private route: ActivatedRoute) { }

  searchTerm: string = '';
  categoryId: string = '';
  sortBy: any = '';
  sortOrder: number = -1;
  brandId: string = '';
  page: number = 1; // We have to increment it further in order to see more products as only 6 products are allowed to be visible on one page
  pageSize: number = 6; // It shows 6 products on one page
  products: Product[] = [];
  categories: any = [];
  sort: string = '';
  categoryName: string = '';
  brands: Brand[] = [];

  ngOnInit() {
    this.route.queryParams.subscribe((x: any) => {
      this.searchTerm = x.search || '';
      this.categoryId = x.categoryId || '';
      this.getProducts();
      this.getCategories();
      this.getBrands();
    });
  }

  getProducts() {
    // Set sortOrder based on the selected sorting option
    if (this.sort === 'nameAsc') {
      this.sortOrder = 1; // Ascending order
    } else if (this.sort === 'nameDesc') {
      this.sortOrder = -1; // Descending order
    } else if (this.sort === 'price') {
      this.sortOrder = 1; // Sort by price in ascending order
    } else {
      this.sortOrder = -1; // Default sort (Descending order)
    }

    // If sorting by name (nameAsc or nameDesc), set sortBy = 'name'. Otherwise, set it to 'price' or default
    this.sortBy = (this.sort === 'nameAsc' || this.sort === 'nameDesc') ? 'name' : this.sort;

    // Update the brandId filter if selected
    const selectedBrands = this.brands.filter(brand => brand.selected).map(brand => brand._id);
    this.brandId = selectedBrands.join(',');

    this.customerService.getProducts(this.searchTerm, this.categoryId, this.sortBy, this.sortOrder, this.brandId, this.page, this.pageSize)
      .subscribe(result => {
        console.log(result);
        this.products = result;
      });
  }

  getCategories() {
    this.customerService.getCategories().subscribe((res) => {
      console.log(res);
      this.categories = res;
      for (let x of this.categories) {
        if (x._id == this.categoryId) {
          this.categoryName = x.name;
        }
      }
    });
  }

  getBrands() {
    this.customerService.getBrands().subscribe((res) => {
      console.log(res);
      this.brands = res;
    });
  }

  // When a brand's checkbox is toggled, update the product list accordingly
  onBrandChange(brand: Brand) {
    // Update the product list after toggling the checkbox
    this.getProducts();
  }

  // Handles the brand selection logic
  onBrandSelect(selectedBrand: Brand) {
    // Toggle the selected state of the brand
    selectedBrand.selected = !selectedBrand.selected;

    // If all brands are unchecked, reset the brandId to show all products
    if (this.brands.every(brand => !brand.selected)) {
      this.brandId = ''; // Reset brandId to show all products
    } else {
      // Otherwise, filter out the selected brands and update brandId
      const selectedBrands = this.brands.filter(brand => brand.selected).map(brand => brand._id);
      this.brandId = selectedBrands.join(',');
    }

    // Fetch the updated product list based on the brand selection
    this.getProducts();
  }

  nextPage() {
    this.page += 1;  // When you click "Next": Increase the page number by 1
    this.getProducts();  // Fetch products for the new page
  }

  previousPage() {
    if (this.page > 1) {  // It checks if you are on a page greater than 1 (this.page > 1).
      this.page -= 1;  // If true, it decreases the page number by 1 (page -= 1).
      this.getProducts();  // Fetch products for the new page
    }
  }
  onCategorySelect(categoryId: string): void {
    // Update the selected category ID
    this.categoryId = categoryId;

    // Call getProducts() to fetch products based on the selected category
    this.getProducts();
}

  
}



// import { Component, OnInit } from '@angular/core';
// import { CustomerService } from 'src/app/services/customer.service';
// import { Product } from 'src/app/types/product';
// import { ActivatedRoute } from '@angular/router';
// import { Brand } from 'src/app/types/brand';

// @Component({
//   selector: 'app-product-list',
//   templateUrl: './product-list.component.html',
//   styleUrls: ['./product-list.component.css']
// })
// export class ProductListComponent implements OnInit {

//   constructor(private customerService: CustomerService, private route: ActivatedRoute) { }

//   searchTerm: string = '';
//   categoryId: string = '';  // Holds the selected category ID for filtering
//   sortBy: any = '';
//   sortOrder: number = -1;
//   brandId: string = '';
//   page: number = 1; // We have to increment it further in order to see more products as only 6 products are allowed to be visible on one page
//   pageSize: number = 6; // It show 6 products on one page
//   products: Product[] = [];
//   categories: any = [];
//   sort: string = '';
//   categoryName: string = '';
//   brands: Brand[] = [];

//   ngOnInit() {
//     this.route.queryParams.subscribe((x: any) => {
//       // from header this.router.navigateByUrl("/products?search=" + encodeURIComponent(e.target.value));
//       this.searchTerm = x.search || '';
//       this.categoryId = x.categoryId || '';
//       this.getProducts();
//       this.getCategories();
//       this.getBrands();
//     });
//   }

//   // ### **Case 1: User Selects (A-Z)**
//   // - **Dropdown Value:**  
//   //   `sortBy = 'nameAsc'`
//   // - **Logic in `loadProducts()`:**  
//   //   - `sortOrder = 1` (ascending order)  
//   //   - `sortBy = 'name'` (to sort by the name field)  
//   // - **Backend Call:**  
//   //   The app requests products sorted by `name` in ascending order.
//   // - **Example Result:**  
//   //   `[Apple, Banana, Cherry]`

//   getProducts() {
//     // Here we are setting the sortOrder for backend
//     if (this.sort === 'nameAsc') {
//       this.sortOrder = 1; // Ascending order
//     } else if (this.sort === 'nameDesc') {
//       this.sortOrder = -1; // Descending order
//     } else if (this.sort === 'price') {
//       this.sortOrder = 1; // Sort by price in ascending order
//     } else {
//       this.sortOrder = -1; // Default sort (Descending order)
//     }

//     // If sorting by name (nameAsc or nameDesc), set sortBy = 'name'. This ensures the backend knows what field to sort by.  
//     // Here we are setting the sortBy for backend either name or price
//     this.sortBy = (this.sort === 'nameAsc' || this.sort === 'nameDesc') ? 'name' : this.sort;

//     // Update the brandId filter if selected
//     const selectedBrands = this.brands.filter(brand => brand.selected).map(brand => brand._id);
//     this.brandId = selectedBrands.join(',');

//     // Fetch products based on search term, selected category, sort options, selected brands, and pagination
//     this.customerService.getProducts(this.searchTerm, this.categoryId, this.sortBy, this.sortOrder, this.brandId, this.page, this.pageSize)
//       .subscribe(result => {
//         console.log(result);
//         this.products = result;
//       });
//   }

//   getCategories() {
//     this.customerService.getCategories().subscribe((res) => {
//       console.log(res);
//       this.categories = res;
//     });
//   }

//   getBrands() {
//     this.customerService.getBrands().subscribe((res) => {
//       console.log(res);
//       this.brands = res;
//     });
//   }

//   // Handle category selection (when a category is clicked)
//   onCategorySelect(categoryId: string) {
//     // If the same category is clicked again, reset the filter (show all products)
//     this.categoryId = this.categoryId === categoryId ? '' : categoryId;

//     // Fetch products based on the selected category
//     this.getProducts();
//   }

//   // Handles the brand selection logic
//   onBrandSelect(selectedBrand: Brand) {
//     // Uncheck all other brands
//     this.brands.forEach((brand) => {
//       brand.selected = brand._id === selectedBrand._id;
//     });

//     // Update the product list based on the selected brand
//     this.getProducts();
//   }

//   nextPage() {
//     this.page += 1; // When you click "Next": Increase the page number by 1
//     this.getProducts(); // Fetch products for the new page
//   }

//   previousPage() {
//     if (this.page > 1) { // It checks if you are on a page greater than 1 (this.page > 1).
//       this.page -= 1; // If true, it decreases the page number by 1 (page -= 1).
//       this.getProducts(); // Fetch products for the new page
//     }
//   }
// }

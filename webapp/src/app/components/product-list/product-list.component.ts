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
  pageSize: number = 9; // It shows 6 products on one page
  products: Product[] = [];
  categories: any = [];
  sort: string = '';
  categoryName: string = '';
  brands: Brand[] = [];
  loading: boolean = false; // Added loading state

  ngOnInit() {
    this.scrollToTop();
  
    this.route.queryParams.subscribe((x: any) => {
      this.searchTerm = x.search || '';
      this.categoryId = x.categoryId || '';
      
      // Reset page to 1 when category is selected from header
      this.page = x.page ? parseInt(x.page, 10) : 1;
      
      this.getProducts();
      this.getCategories();
      this.getBrands();
    });
  }
  

  // Scroll to top of the browser window
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  getProducts() {
    this.loading = true; // Set loading to true before fetching products
  
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
    console.log("GetProducts Page",this.page)
    this.customerService.getProducts(this.searchTerm, this.categoryId, this.sortBy, this.sortOrder, this.brandId, this.page, this.pageSize)
      .subscribe(
        result => {
          console.log(result);
          this.products = result;
          this.loading = false; // Set loading to false after products are fetched
  
          // Scroll to top when products are loaded
          this.scrollToTop();
        },
        error => {
          console.error('Error fetching products:', error);
          this.loading = false; // Set loading to false if there's an error
        }
      );
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

  onBrandSelect(selectedBrand: Brand) {
    // Toggle the selected state of the brand
    selectedBrand.selected = !selectedBrand.selected;
  
    // Reset page to 1 when brands are selected
    this.page = 1;
    console.log("Brand Page", this.page)
  
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
  
  onCategorySelect(categoryId: string): void {
    // Reset page to 1 when category is selected
    this.page = 1;
    console.log("Category Page", this.page)
    console.log(this.page)
  
    // Update the selected category ID
    this.categoryId = categoryId;
  
    // Call getProducts() to fetch products based on the selected category
    this.getProducts();
  }
  
  nextPage() {
    // Ensure that there are enough products to move to the next page
    if (this.products.length === this.pageSize) {
      this.page += 1;  // Increment the page number
      this.getProducts();  // Fetch products for the new page
    }
  }
  
  previousPage() {
    // Ensure page is greater than 1
    if (this.page > 1) {
      this.page -= 1; // Decrease the page number
      this.getProducts(); // Fetch products for the previous page
    }
  }
  
  
  

  
 
  


}

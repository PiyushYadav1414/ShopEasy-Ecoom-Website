import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './manage/categories/categories.component';
import { CategoryFormComponent } from './manage/category-form/category-form.component';
import { HomeComponent } from './home/home.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrandsComponent } from './manage/brands/brands.component';
import { BrandFormComponent } from './manage/brand-form/brand-form.component';
import { ProductsComponent } from './manage/products/products.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductFormComponent } from './manage/product-form/product-form.component'; // Import ProductFormComponent
import { MatSelectModule } from '@angular/material/select';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ProductCardComponent } from './product-card/product-card.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './manage/admin-dashboard/admin-dashboard.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { WishlistsComponent } from './wishlists/wishlists.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { MatRadioModule } from '@angular/material/radio';
import { CustomerOrdersComponent } from './customer-orders/customer-orders.component';
import { OrdersComponent } from './manage/orders/orders.component'
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryFormComponent,
    HomeComponent,
    BrandsComponent,
    BrandFormComponent,
    ProductsComponent,
    ProductFormComponent,
    HeaderComponent,
    FooterComponent,
    ProductCardComponent,
    ProductListComponent,
    ProductDetailComponent,
    RegisterComponent,
    LoginComponent,
    AdminDashboardComponent,
    CustomerProfileComponent,
    WishlistsComponent,
    ShoppingCartComponent,
    CustomerOrdersComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterLink,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,  // Ensure ReactiveFormsModule is imported here
    MatSelectModule,
    MatCheckboxModule,
    CarouselModule,
    MatRadioModule,
    MatButtonToggleModule ,
    MatSnackBarModule,
    MatIconModule 
    
  
  ],
  exports: [CategoriesComponent, CategoryFormComponent, HomeComponent, BrandsComponent, BrandFormComponent, ProductsComponent, ProductFormComponent, FooterComponent, HeaderComponent,ProductCardComponent]

})
export class ComponentsModule { }

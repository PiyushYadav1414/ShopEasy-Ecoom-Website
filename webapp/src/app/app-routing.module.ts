import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/manage/categories/categories.component';
import { CategoryFormComponent } from './components/manage/category-form/category-form.component';
import { BrandsComponent } from './components/manage/brands/brands.component';
import { BrandFormComponent } from './components/manage/brand-form/brand-form.component';
import { ProductsComponent } from './components/manage/products/products.component';
import { ProductFormComponent } from './components/manage/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './core/auth-gaurd';
import { AdminDashboardComponent } from './components/manage/admin-dashboard/admin-dashboard.component';
import { adminGuard } from './core/admin-guard';
import { CustomerProfileComponent } from './components/customer-profile/customer-profile.component';
import { WishlistsComponent } from './components/wishlists/wishlists.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CustomerOrdersComponent } from './components/customer-orders/customer-orders.component';
import { OrdersComponent } from './components/manage/orders/orders.component';
// Use the authGuard to protect this route
export const routes: Routes = [
  { path: '', component: HomeComponent,canActivate: [authGuard]},// Use the authGuard to protect this route // Home route
  { path: 'admin', component: AdminDashboardComponent,canActivate:[adminGuard] }, 
  { path: 'admin/categories', component: CategoriesComponent,canActivate:[adminGuard] }, // List of categories
  { path: 'admin/categories/add', component: CategoryFormComponent,canActivate:[adminGuard] }, // Add new category
  { path: 'admin/categories/:id', component: CategoryFormComponent,canActivate:[adminGuard] }, // Edit category by id
  { path: 'admin/brands', component: BrandsComponent,canActivate:[adminGuard]}, // List of categories
  { path: 'admin/brands/add', component: BrandFormComponent,canActivate:[adminGuard]}, // Add new category
  { path: 'admin/brands/:id', component: BrandFormComponent,canActivate:[adminGuard] }, // Edit category by id
  { path: 'admin/products', component: ProductsComponent,canActivate:[adminGuard]}, // List of categories
  { path: 'admin/orders', component: OrdersComponent,canActivate:[adminGuard]}, 
  { path: 'admin/products/add', component: ProductFormComponent,canActivate:[adminGuard]}, // Add new category
  { path: 'admin/products/:id', component: ProductFormComponent,canActivate:[adminGuard] }, // Edit category by id
  { path: 'products', component: ProductListComponent,canActivate: [authGuard] },// Use the authGuard to protect this route
  { path: 'product/:id', component: ProductDetailComponent,canActivate: [authGuard] },// Use the authGuard to protect this route
  { path: 'profile', component: CustomerProfileComponent,canActivate: [authGuard] },
  { path: 'wishlists', component: WishlistsComponent,canActivate: [authGuard] },
  { path: 'cart', component: ShoppingCartComponent,canActivate: [authGuard] },
  { path: 'orders', component: CustomerOrdersComponent,canActivate: [authGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

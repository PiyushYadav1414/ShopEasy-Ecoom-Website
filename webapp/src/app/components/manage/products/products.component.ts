import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { Product } from '../../../types/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'price', 'shortDescription', 'discount', 'action'];

  dataSource: MatTableDataSource<Product> = new MatTableDataSource();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productsService: ProductService, private router: Router) {}

  ngOnInit() {
    this.getServerData();
  }

  private getServerData() {
    this.productsService.getProducts().subscribe((result: any) => {
      this.dataSource.data = result;
    });
  }
  

  
   

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(id: string) {
    this.productsService.deleteProductById(id).subscribe(() => {
      alert('Product deleted successfully!');
      this.getServerData(); // Reload product data after deletion
    });
  }
}


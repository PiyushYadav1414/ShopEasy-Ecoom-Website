import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator'; // For adding pagination
import { MatSort } from '@angular/material/sort'; // For sorting the data
import { MatTableDataSource } from '@angular/material/table'; // For managing data in the table
import { BrandService } from 'src/app/brand.service';
import { Router } from '@angular/router';  // Import the Router
import { Brand } from '../../../types/brand'; // Changed to Brand type

@Component({
  selector: 'app-brands', // Updated the component selector
  templateUrl: './brands.component.html', // Updated the HTML template file path
  styleUrls: ['./brands.component.css'], 
})
export class BrandsComponent {

  displayedColumns: string[] = ['id', 'name', 'action'];  // Columns to display in the table

  dataSource: MatTableDataSource<Brand> = new MatTableDataSource();  // Data source for the table

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private brandService: BrandService, private router: Router) {
    this.dataSource = new MatTableDataSource([] as any);
  }

  ngOnInit() {
    this.getServerData();  // Call the method to fetch data when the component initializes
  }

  private getServerData() {
    this.brandService.getBrands().subscribe((result: any) => {  // Changed to getBrands
      console.log(result);
      this.dataSource.data = result;  // Assign the result to the dataSource
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
      this.dataSource.paginator.firstPage();  // Reset paginator to first page when filter is applied
    }
  }

  delete(id: string) {
    this.brandService.deleteBrandById(id).subscribe((data) => {  // Changed to deleteBrandById
      alert("Brand deleted successfully!");
      this.router.navigateByUrl("/admin/brands");
      this.getServerData();  // Reload the data after deletion
    });
  }
}

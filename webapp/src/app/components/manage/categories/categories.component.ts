import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator'; //For adding pagination (splitting data into pages).
import { MatSort } from '@angular/material/sort'; //For sorting the data in the table (ascending or descending).
import { MatTableDataSource } from '@angular/material/table';// A special class for managing data in the table, which also helps with filtering, sorting, and pagination.
import { CategoriesService } from 'src/app/categories.service';
import { Router } from '@angular/router';  // Import the Router
import { Category } from '../../../types/category';



@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
 
})
export class CategoriesComponent {

  

  displayedColumns: string[] = ['id', 'name', 'action'];  // Columns to display in the table

//dataSource: This is where the data for the table is stored.Instead of directly putting an array of data into 
//your table, you wrap it inside a MatTableDataSource.  It uses MatTableDataSource, which helps with filtering, sorting, and pagination.
  dataSource: MatTableDataSource<Category> = new MatTableDataSource();  // Data source for the table

//@ViewChild: This is a decorator that allows us to get a reference to the paginator and sorter, which are in the HTML template.
// In the HTML file, you may have:
// <mat-paginator></mat-paginator> <!-- Adds pagination controls --> <table mat-table [dataSource]="dataSource" matSort> <!-- Adds sorting to table -->
// In TypeScript, @ViewChild(MatPaginator) connects to the <mat-paginator> element and lets you control it.

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private categoryService : CategoriesService, private router : Router) {
    //  initializes the table with an empty data source so the table can render even when no data is available initially.
        this.dataSource = new MatTableDataSource([] as any);
  }

  ngOnInit() {
    this.getServerData();  // Call the method to fetch data when the component initializes
  }
  

  private getServerData() {
    this.categoryService.getCategories().subscribe((result: any) => {
      console.log(result);
 //this.dataSource is an instance of the MatTableDataSource which has the data property which gives an array of object
 //with the help of that properties that you can store the data that will be displayed in the table.
      this.dataSource.data = result;
    });
  }

  //ngAfterViewInit: This is a lifecycle method that runs after the (view) HTML file has been fully initialized.
  ngAfterViewInit() {
  //It assigns the paginator and sort to the dataSource so that the table can be paginated and sorted based on user actions.
 //Yes, this.dataSource is an instance of the MatTableDataSource which has the paginator and sort properties 
 //predefined and with the help of that properties that you can  enable pagination and sorting functionality in your Material table.
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //dataSource: Stores the data to be displayed in the table and helps with sorting, filtering, and pagination.
  //This method is used to filter the data in the table.
  //Filter Logic: It takes the value typed by the user, trims spaces, and converts it to lowercase. This value is then applied to filter the rows of the table.
  applyFilter(event: Event) {
    //event.target.value: It gets the value typed by the user in the filter input box.
    const filterValue = (event.target as HTMLInputElement).value;
    //this.dataSource.filter: It sets the filter value in dataSource to match the typed text. It converts the filter text to lowercase and trims any extra spaces.
    // .filter is a predefind method of MatTableDataSource class and it checks if each row in the table contains the filter string in any of its fields.
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // This checks if the paginator property of this.dataSource is set (not null or undefined).
    if (this.dataSource.paginator) { // if defined then go below 
    //this.dataSource.paginator.firstPage(): If a filter is applied, it resets the table to show the first page of data.  
      this.dataSource.paginator.firstPage();  // Reset paginator to first page when filter is applied
    }
  }


  delete(id:string){
    this.categoryService.deleteCategoryById(id).subscribe((data)=>{
      alert("Category deleted successfully!");
        // Navigate to the categories list page after the category is added
        this.router.navigateByUrl("/admin/categories");
        this.getServerData(); 
        
    })
  }




}

// 4. Why Reset the Paginator to the First Page?
// Page 1 would show: Category 1 to Category 5
// Page 2 would show: Category 6 to Category 10
// Imagine you were on Page 2 before applying the filter. After applying the filter, the table only shows 2 items, and now Page 2 has no data to display because only 2 rows are visible.

// To make sure the user doesn't stay on an empty page (in this case, Page 2), the paginator is reset to the first page after applying the filter. This helps the user start from the beginning and see the filtered data right away.

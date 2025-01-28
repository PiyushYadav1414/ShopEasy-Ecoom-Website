import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css'],
})
export class CustomerProfileComponent implements OnInit {
  customer: any;
  loading: boolean = true; // Added loading state

  constructor(
    private customerService: CustomerService, 
    private route: ActivatedRoute, 
    private router: Router, 
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    // Set loading to true initially
    this.loading = true;

    // Simulating customer data fetch (replace with actual implementation)
    setTimeout(() => {
      // const customerId = this.route.snapshot.paramMap.get('id');
      // if (customerId) {
      //   this.customerService.getCustomerById(customerId).subscribe((data) => {
      //     this.customer = data;
      //     this.loading = false;
      //   });
      // }
      this.loading = false; // Set loading to false after data fetch
    }, 1000);
  }

  goBack() {
    this.router.navigate(['/customers']);
  }

  editCustomer() {
    this.router.navigate(['/edit-customer', this.customer.id]);
  }

  deleteCustomer() {
    // if (confirm('Are you sure you want to delete this customer?')) {
    //   this.customerService.deleteCustomer(this.customer.id).subscribe(() => {
    //     alert('Customer deleted successfully');
    //     this.router.navigate(['/customers']);
    //   });
    // }
  }

  editProfile(){
    // Implementation for editing profile
  }
}

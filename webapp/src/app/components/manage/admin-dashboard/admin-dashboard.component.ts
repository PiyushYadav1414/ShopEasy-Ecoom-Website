import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  loading: boolean = true;

  ngOnInit() {
    // Simulate data loading
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
}

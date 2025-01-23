import { Component } from '@angular/core';
import { BrandService } from 'src/app/brand.service';  // Change to BrandsService
import { Router } from '@angular/router';  // Import the Router
import { ActivatedRoute } from '@angular/router';  // Import ActivatedRoute

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',  // Update the template file name
  styleUrls: ['./brand-form.component.css']  // Update the style file name
})
export class BrandFormComponent {
  constructor(private brandService: BrandService, private router: Router, private activeroute: ActivatedRoute) {
  }

  name!: string;
  isEdit = false;
  id!: string;

  ngOnInit() {
    this.id = this.activeroute.snapshot.params["id"];
    console.log(this.id);

    if (this.id) {
      this.isEdit = true;

      // Fetch the brand details if updating
      this.brandService.getBrandById(this.id).subscribe((result: any) => {
        console.log(result);
        this.name = result.name;
      });
    }
  }

  add() {
    console.log(this.name);
    this.brandService.addBrand(this.name).subscribe((result: any) => {
      alert("Brand added successfully!");
      this.router.navigateByUrl("/admin/brands");
    });
  }

  update() {
    console.log(this.name);  // Log the name of the brand

    // Assuming you have a service method for updating the brand
    this.brandService.updateBrand(this.id, this.name).subscribe((result: any) => {
      alert('Brand updated');
      this.router.navigateByUrl('/admin/brands');  // Navigate to the brand list after updating
    });
  }
}

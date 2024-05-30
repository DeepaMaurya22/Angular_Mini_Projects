import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ProductService } from '../../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [MatButtonModule, FormsModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss',
})
export class EditProductComponent {
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  productForm: FormGroup = this.formBuilder.group({
    id: [''],
    name: ['', [Validators.required, Validators.minLength(5)]],
    brand: ['', [Validators.required]],
    price: [''],
    originalPrice: [''],
    discount: [''],
    image: [''],
  });

  productService = inject(ProductService);
  activatedRoute = inject(ActivatedRoute);
  toastrService = inject(ToastrService);

  ngOnInit() {
    let productId = this.activatedRoute.snapshot.params['id'];
    this.productService.getProductById(productId).subscribe((result) => {
      this.productForm.patchValue(result);
    });
  }

  editProduct() {
    if (this.productForm.invalid) {
      this.toastrService.error('Please Provide all fields with valid input');
      return;
    }
    this.productService
      .UpdateProduct(this.productForm.value)
      .subscribe((result) => {
        this.toastrService.success('Updated');
        this.router.navigateByUrl('/');
      });
  }
}

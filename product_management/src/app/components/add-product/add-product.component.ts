import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Product } from '../../types/product';
import { ProductService } from '../../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [MatButtonModule, FormsModule, MatInputModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent {
  product: Product = {
    name: '',
    brand: '',
    price: 0,
    originalPrice: 0,
    discount: 0,
    image: '',
  };
  productService = inject(ProductService);
  router = inject(Router);
  addProduct() {
    this.productService.addProduct(this.product).subscribe((result) => {
      alert('Added');
      this.router.navigateByUrl('');
    });
  }
}

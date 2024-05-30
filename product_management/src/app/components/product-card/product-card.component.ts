import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../types/product';
import { UpperCasePipe } from '@angular/common';
import { RupeePipe } from '../../rupee.pipe';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, UpperCasePipe, RupeePipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() viewProduct = new EventEmitter<number>();

  view() {
    this.viewProduct.emit(this.product.id);
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { environment } from '@frontend/admin/environments';

@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  host: string = environment.host;
  constructor() {}

  ngOnInit(): void {}
}

import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {
  @Input('product') product;
  @Input('shopping-cart') shoppingCart; // To get the cart object from the DB for the current user and pass it to each card as an input

  constructor(private shoppingCartService: ShoppingCartService) { }

  addToCart() {
    // let cart = localStorage.getItem('cartId');
    this.shoppingCartService.addToCart(this.product);
  }

  removeFromCart() {
    this.shoppingCartService.removeFromCart(this.product);
  }

  ngOnInit() {
  }

}

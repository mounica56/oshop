import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'shared/models/product';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
@Input('product') product;
@Input('show-actions') showActions = true;
@Input('shopping-cart') shoppingCart: ShoppingCart; // To get the cart object from the DB for the current user and pass it to each card as an input

  constructor(private shoppingCartService: ShoppingCartService) { }

  addToCart(){
    // let cart = localStorage.getItem('cartId');
    this.shoppingCartService.addToCart(this.product);
  }

}

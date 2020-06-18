import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from 'shared/models/product';
import { take, map } from 'rxjs/operators';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Observable } from 'rxjs';
import { ShoppingCartItem } from 'shared/models/shopping-cart-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  // public methods fixed
  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();

    return this.db.object('/shopping-carts/' + cartId).snapshotChanges()
    // .pipe(map(x => new ShoppingCart(x.payload.exportVal().items)));
      .pipe(map((items) => new ShoppingCart(items.payload.child('/items').val())));
    // return this.db.object('/shopping-carts/' + cartId).valueChanges()
    //   .pipe(map(({items}) => new ShoppingCart(items)));
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');

    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;

    // alternative method
    // if(!cartId) {
    //   this.create().then(result => {
    //     localStorage.setItem('cartId', result.key);

    //     return this.getCart(result.key)
    //   })
    // } else {
    //     return this.getCart(cartId);
    // }
  }

  private async updateItem(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item = this.getItem(cartId, product.key);

    item
      .valueChanges()
      .pipe(take(1))
      .subscribe((data: ShoppingCartItem) => {
        const quantity = (data ? (data.quantity || 0) : 0) + change; // Used || to avoid null reference error
        if (quantity === 0) item.remove();
        // if (!quantity)
        //   item.remove();
        else
          item.update({
            title: product.title,
            imageUrl: product.imageUrl,
            price: product.price,
            quantity
          });
      });
  }

}


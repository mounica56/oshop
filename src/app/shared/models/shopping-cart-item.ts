export class ShoppingCartItem {
    key: string;
    title: string;
    imageUrl: string;
    price: number;
    quantity: number;

    constructor(init?: Partial<ShoppingCartItem>) {
        Object.assign(this, init); //to copy to all those properites of this init into this current object
      }

    get totalPrice() {
        return (this.price * this.quantity);
    }
}
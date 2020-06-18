import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from 'shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll(): Observable<Product[]> {
    return this.db.list<Product>('/products').snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => 
            ({ key: a.payload.key, ...a.payload.val() }))
        )
      );
  }

  // getAll() {
  //   return this.db.list('/products').snapshotChanges()
  //     .pipe(
  //       map(a => a.map(
  //         ac => {
  //           const data = ac.payload.val();
  //           const id = ac.payload.key;
  //           console.log(data);
  //           console.log(id)
  //           return { data, id };
  //         }
  //       ))
  //     )
  // }

  get(productId): Observable<Product> {
    return this.db.object<Product>('/products/' + productId)
      .valueChanges().pipe(take(1));
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }


}

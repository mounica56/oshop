import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  // categories$: AngularFireList<any>

  constructor(private db: AngularFireDatabase) { }

  getCategories(){
    return this.db.list('/categories',
    query => query.orderByChild('name')).snapshotChanges();
  }
}

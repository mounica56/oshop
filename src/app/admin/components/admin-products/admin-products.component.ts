import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'shared/models/product';
import { DataTableResource } from 'angular7-data-table';
import { count } from 'rxjs/operators';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  // filteredProducts: any[];
  subscription : Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;
  
  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll()
    // .subscribe((products: Product[]) => {
    .subscribe(products => { 
      this.products = products;
      this.initializeTable(products); // Initializing data-table here
    });
   }

  ngOnInit() {
  }

  private initializeTable(products: Product[]) {
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset: 0}) // query -> gets all records for the current page based on current parameter offset: 0 means page 1
      .then(items => this.items = items); // all items
    this.tableResource.count() // count -> total no records in a table
      .then(count => this.itemCount = count);  
  }

  reloadItems(params) {
    if (!this.tableResource) return;

    this.tableResource.query(params) // Gets all the records for the current page based on the current parameter | offset: 0 means page 1
      .then(items => this.items = items);
  }

  filter(query: string){
    console.log(query);
    let filteredProducts = (query) ? 
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())):
      this.products;

    this.initializeTable(filteredProducts); //filtering the table
  }

  // Implementing ngOnDestroy() as we need the subscription to be there for the lifetime of this component because it's possible
  // that the user might have different windows open (such as one with a list of products and the other with the product edit window)
  // We want to ensure that the changes are refleting in realtime in both the windows
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product: any = {}; // To avoid errors in the console while waiting for the aync operation to complete
  id;

  constructor(categoryService: CategoryService, private productService: ProductService,private router: Router, 
    private route: ActivatedRoute // to read url params
    ) {
    this.categories$ = categoryService.getCategories();

    this.id = this.route.snapshot.paramMap.get('id');//read the id parameter
    if(this.id)
      this.productService.get(this.id).
        subscribe(p => this.product = p);
    }

  ngOnInit() {
  }

  save(product) {
    if (this.id)
      this.productService.update(this.id, product);
    else
      console.log(product);
      this.productService.create(product);

    this.router.navigate(['/admin/products'])
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?'))
      return;

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

}

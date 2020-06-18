import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';

@Component({
  selector: 'app-products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.css']
})
export class ProductsFilterComponent implements OnInit {
  categories$;
  @Input('category') category: string;

  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getCategories();
   }

  ngOnInit() {
  }

}

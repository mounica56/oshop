import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './shopping/components/products/products.component';
import { LoginComponent } from './core/components/login/login.component';

const routes: Routes = [
  // anonymous users
  { path: '', component: ProductsComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

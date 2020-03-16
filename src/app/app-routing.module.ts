import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllCategoriesComponent} from './all-categories/all-categories.component';
import {BasketComponent} from './basket/basket.component';
import {CheckOutComponent} from './check-out/check-out.component';
import {AboutMeComponent} from './about-me/about-me.component';
import {DeliveryComponent} from './delivery/delivery.component';
import {CheckoutSuccessComponent} from './checkout-success/checkout-success.component';
import {CreateProductComponent} from './create-product/create-product.component';
import {EditProductComponent} from './edit-product/edit-product.component';
import {EditOneProductComponent} from './edit-one-product/edit-one-product.component';
import {OrdersComponent} from './orders/orders.component';
import {ProductsComponent} from './products/products.component';
import {SingleProductComponent} from './single-product/single-product.component';
import {CreateCategoryComponent} from './create-category/create-category.component';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {AuthGuard} from './auth.guard';
import {AdminGuard} from './admin.guard';

const routes: Routes = [
  {path: '', redirectTo: 'allCategories', pathMatch: 'full'},
  {path: 'aboutMe', component: AboutMeComponent},
  {path: 'delivery', component: DeliveryComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'allCategories', component: AllCategoriesComponent},
  {path: 'products/:id', component: ProductsComponent},
  {path: 'singleProduct/:id', component: SingleProductComponent},
  {path: 'basket', component: BasketComponent},
  {path: 'checkout', component: CheckOutComponent, canActivate: [AuthGuard]},
  {path: 'checkoutSuccess', component: CheckoutSuccessComponent},
  {path: 'admin/createProduct', component: CreateProductComponent, canActivate: [AdminGuard]},
  {path: 'admin/editProduct', component: EditProductComponent, canActivate: [AdminGuard]},
  {path: 'admin/editOneProduct/:id', component: EditOneProductComponent, canActivate: [AdminGuard]},
  {path: 'admin/createCategory', component: CreateCategoryComponent, canActivate: [AdminGuard]},
  {path: 'admin/orders', component: OrdersComponent, canActivate: [AdminGuard]}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

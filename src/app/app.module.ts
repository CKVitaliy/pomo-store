import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import * as userReducers from './Store/Reducers/user.reducers';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {MainComponent} from './main/main.component';
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
import {TokenInterceptorService} from './token-interceptor.service';
import {AdminGuard} from './admin.guard';

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        AllCategoriesComponent,
        BasketComponent,
        CheckOutComponent,
        AboutMeComponent,
        DeliveryComponent,
        CheckoutSuccessComponent,
        CreateProductComponent,
        EditProductComponent,
        EditOneProductComponent,
        OrdersComponent,
        ProductsComponent,
        SingleProductComponent,
        CreateCategoryComponent,
        LoginComponent,
        RegistrationComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        StoreModule.forRoot({user: userReducers.userReducer})
    ],
    providers: [AuthGuard, AdminGuard, {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptorService,
        multi: true
    }],
    bootstrap: [AppComponent]
})
export class AppModule {
}

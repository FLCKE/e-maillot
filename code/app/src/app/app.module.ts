import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { CommandComponent } from './command/command.component';
import { ProfilComponent } from './profil/profil.component';
import { CatalogueComponent } from './catalogue/catalogue.component';



@NgModule({
  declarations: [
    AppComponent,
    SubscribeComponent,
    LoginComponent,
    HomeComponent,
    ProductComponent,
    CartComponent,
    CommandComponent,
    ProfilComponent,
    CatalogueComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

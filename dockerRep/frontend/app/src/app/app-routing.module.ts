import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { CommandComponent } from './command/command.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { ProfilComponent } from './profil/profil.component';
const routes: Routes = [
  { path: "subscribe", component: SubscribeComponent, },
  { path: "login", component: LoginComponent, },
  {
    path: "home", component: HomeComponent, children: [
      { path: 'contact', component: HomeComponent }
    ]
  },
  { path: "product/:id", component: ProductComponent, },
  { path: "cart", component: CartComponent, },
  { path: "command", component: CommandComponent, },
  { path: "catalogue", component: CatalogueComponent, },
  { path: "profil", component: ProfilComponent, },
  { path: '', redirectTo: '/home', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

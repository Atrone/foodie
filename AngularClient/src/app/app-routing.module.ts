import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendorsComponent } from './vendors/vendors.component';
import { HomeComponent } from './home/home.component';
import { ItalianComponent } from './vendors/italian/italian/italian.component';
import { TimHortonsSaugeenMaitlandComponent } from './vendors/vendorSpecifics/tim-hortons-saugeen-maitland/tim-hortons-saugeen-maitland.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'vendors',
    component: VendorsComponent
  },
  {
    path: 'italian',
    component: ItalianComponent
  },
  {
	  path: 'SaugeenMaitlandHall,London,ONN6G,Canada',
	  component: TimHortonsSaugeenMaitlandComponent
  },
  {
	  path: 'cart',
	  component: CartComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

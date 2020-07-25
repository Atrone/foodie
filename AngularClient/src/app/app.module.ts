import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatDividerModule,
  MatIconModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VendorsComponent } from './vendors/vendors.component';
import { HomeComponent } from './home/home.component';
import { NgxGooglePlaceAutocompleteDirective } from 'ngx-google-place-autocomplete';
import { FilterPipe } from './vendors/filter.pipe';
import { ClickOutsideModule } from 'ng-click-outside';
import { ItalianComponent } from './vendors/italian/italian/italian.component';
import { TimHortonsSaugeenMaitlandComponent } from './vendors/vendorSpecifics/tim-hortons-saugeen-maitland/tim-hortons-saugeen-maitland.component';
import { MatDialogModule } from '@angular/material';
import { DialogDemoComponent } from './vendors/vendorSpecifics/tim-hortons-saugeen-maitland/dialog-demo/dialog-demo.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CartComponent } from './cart/cart.component';


@NgModule({
  declarations: [ 
    AppComponent,
    VendorsComponent,
    HomeComponent,
	NgxGooglePlaceAutocompleteDirective,
	FilterPipe,
	ItalianComponent,
	TimHortonsSaugeenMaitlandComponent,
	DialogDemoComponent,
	CartComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
	MatDialogModule,
    HttpClientModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
	ClickOutsideModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    FormsModule,
  ],
  entryComponents:[
	DialogDemoComponent
  ],
  providers: [AppComponent,HomeComponent,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }

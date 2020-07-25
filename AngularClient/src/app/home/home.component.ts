import { Component, OnInit, NgZone} from '@angular/core';
import { AppComponent } from '../app.component';
import {Router} from "@angular/router"
import { DOCUMENT } from '@angular/common'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {  
  public flag = false;
  public locationFlag = false;
  public instructionText = "Login to start mobile ordering from vendors all over Western!";
  public infoText = "";
  constructor(private appComponent : AppComponent, public router: Router) { 
  this.flag = this.appComponent.isAuthenticated;
  if(this.flag)
  {
	  this.instructionText = "Enter a London location and then mobile order from vendors all over Western.";
  }
  }

  ngOnInit() {
  }
  onAddressChange(event: any) {
  console.log('Address change:', event);
  if(event.city == "London" && event.state == "ON" && event.country == "Canada")
  {
	  console.log("go to products");
	  localStorage.setItem('location',event.fullAddress);
	  localStorage.setItem('newLocationFlag', '1');
	  console.log((localStorage.getItem('location')));
	  this.router.navigate(['vendors']);
  }
  else
  {
	  this.infoText = "That's not a London location.";
  }
}

}

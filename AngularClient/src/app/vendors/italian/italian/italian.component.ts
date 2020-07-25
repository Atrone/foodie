import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"

@Component({
  selector: 'app-italian',
  templateUrl: './italian.component.html',
  styleUrls: ['./italian.component.css']
})
export class ItalianComponent implements OnInit {
public showDropDown = false;
	public prevTime = 0;
characters = [	];

public vendorTitle = [
];

public vendorAddress = [
];
public vendorDistance = [];
public vendorsDict = {};
public vendorsDictForImages = {};

public vendorImages = [
];

public vendorGenres = [];
public newLocationFlag = true;
  constructor(private router: Router) { 
  if(localStorage.getItem('newLocationFlag') == '1')
	{
		this.router.navigate(['']);
	}
 else{
  for(let i = 0; i < localStorage.getItem('orderedRestaurantAddresses').split(';,').length; i++)
  {
	  if(localStorage.getItem('orderedRestaurantGenres').split(',')[i].includes("italian"))
	  {
		  this.vendorTitle.push(localStorage.getItem('orderedRestaurantTitles').split(',')[i]);
		  this.vendorAddress.push(localStorage.getItem('orderedRestaurantAddresses').split(';,')[i]);
		  this.vendorDistance.push(localStorage.getItem('orderedRestaurantDistances').split(',')[i]);
		  this.vendorImages.push(localStorage.getItem('orderedRestaurantImages').split(',')[i]);
		  this.characters.push(localStorage.getItem('orderedRestaurantTitles').split(',')[i] + " (" + localStorage.getItem('orderedRestaurantAddresses').split(';,')[i] + ")");
	  }
	  
 }
 }
  }

  ngOnInit() {
  }
    toggleDropDown()
  {
	  console.log("toggled");
	  //console.log((JSON.parse(localStorage.getItem('location')));
	  if(Date.now() - this.prevTime < 100)
	  {
		  console.log(Date.now());
		  console.log(this.prevTime);
	  }
	  else
	  {
		this.prevTime= Date.now();
		this.showDropDown = !this.showDropDown;
	  }
  }	
	
  chosen(characters)
  {
	  console.log(characters);


}
goToVendorSpecificPage(vendor)
  {
	  console.log('hi');
	  this.router.navigate([vendor.toString().replace(/-|\s/g,"").slice(0,vendor.toString().replace(/-|\s/g,"").length-1)]);
  }
}

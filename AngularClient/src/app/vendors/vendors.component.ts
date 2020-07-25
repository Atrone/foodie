import { AfterContentInit, Component, OnInit, Renderer2,ViewChild, HostListener, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import {RestaurantInfoService} from './restaurant-info.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent implements OnInit {
	
	public showDropDown = false;
	public prevTime = 0;
characters = ['Italian'];

public vendorTitle = [];

public vendorAddress = [];
public vendorDistance = [];
public vendorsDict = {};
public vendorsDictForImages = {};
public vendorsDictForGenres = {};
public vendorImages = [];
public vendorGenres = [];
public newLocationFlag = true;


    public restaurantService: RestaurantInfoService;
  constructor(restaurant: RestaurantInfoService, private router: Router) { 
	this.restaurantService = restaurant;
	this.prevTime= Date.now();
	console.log(localStorage.getItem('newLocationFlag'))
	if(localStorage.getItem('newLocationFlag') == '1')
	{
		console.log("what");
		this.populateRestaurants();
		this.newLocationFlag = false;
	}
	else
	{
		this.vendorTitle = localStorage.getItem('orderedRestaurantTitles').split(',');
		this.vendorAddress = localStorage.getItem('orderedRestaurantAddresses').split(';,');
		this.vendorAddress[localStorage.getItem('orderedRestaurantAddresses').split(';,').length-1] = this.vendorAddress[localStorage.getItem('orderedRestaurantAddresses').split(';,').length-1].slice(0,this.vendorAddress[localStorage.getItem('orderedRestaurantAddresses').split(';,').length-1].length-1);
		this.vendorDistance = localStorage.getItem('orderedRestaurantDistances').split(',');
		this.vendorImages = localStorage.getItem('orderedRestaurantImages').split(',');
		for(let i = 0; i < this.vendorAddress.length; i++)
		{
			this.characters.push(this.vendorTitle[i] + " (" + this.vendorAddress[i] + ")");
		}
		console.log(localStorage.getItem('orderedRestaurantTitles').split(','));
		console.log(localStorage.getItem('orderedRestaurantAddresses').split(';,'));
		console.log(localStorage.getItem('orderedRestaurantDistances'));
	}		

  }

  ngOnInit() {

  }
  
  goToVendorSpecificPage(vendor)
  {
	  this.router.navigate([vendor.toString().replace(/-|\s/g,"")]);
  }

  goToItalianPage()
  {
	  this.router.navigate(["italian"]);
  }
  
  populateRestaurants()
  {
	this.restaurantService.getRestaurants()
    .subscribe((data: any[]) => {
		
		for(let i = 0; i < data.length; i++)
		{
			this.vendorTitle.push(data[i].name);
			this.vendorAddress.push(data[i].address);
			this.vendorsDict[this.vendorAddress[i]] = this.vendorTitle[i];
			this.vendorImages.push(data[i].picture);
			this.vendorGenres.push(data[i].genres);
			this.vendorsDictForImages[this.vendorAddress[i]] = this.vendorImages[i];
			this.vendorsDictForGenres[this.vendorAddress[i]] = this.vendorGenres[i];
			//console.log(data[i].name);
			// put the names and addresses in a temp var
		}
	});
	//console.log(this.vendorInfo);
	this.getDistances();
  }
  
    sortDictionaryByValue(maxSpeed)
  {
	  
	  var sortable = [];
	for (var vehicle in maxSpeed) {
		sortable.push([vehicle, maxSpeed[vehicle]]);
	}

	sortable.sort(function(a, b) {
		return a[1] - b[1];
	});

  }

  
  getDistances()
  {
	  setTimeout (() => {
         console.log("Hello from setTimeout");
	  console.log(this.vendorAddress);
	  var addressesToBeSorted = {
	  };
	  //var daVendorAddresses = ['Spencer Engineering, London, ON N6A 5B9, Canada', '1200 Western Rd, London, ON N6G 5E3, Canada', 'Saugeen-Maitland Hall, London, ON N6G, Canada'];
			//'Spencer Engineering, London, ON N6A 5B9, Canada': 15,
			//'1200 Western Rd, London, ON N6G 5E3, Canada': 8,
			//'Saugeen-Maitland Hall, London, ON N6G, Canada': 6
	  for(let i = 0; i < this.vendorAddress.length; i++)
	  {
		  addressesToBeSorted[this.vendorAddress[i]] = 0;
	  }
	  var units = {};

	  //"Spencer Engineering, London, ON N6A 5B9, Canada"
	  //"1200 Western Rd, London, ON N6G 5E3, Canada"
	  //"Saugeen-Maitland Hall, London, ON N6G, Canada"
	  // for i; i < address.length; i++
	  //  dictionary@key(name[i],address[i]) = getDistance(localStorage.getItem('location'), address[i])
	  // sort dictionary by value
	  // for each entry in dictionary
	  //   vendorTitle = entry.key.slice(...)
	  //   vendorAddress = entry.key.slice(...)
	  //   vendorDistance = entry.value
	  
		this.restaurantService.getDistance(localStorage.getItem('location'),this.vendorAddress).subscribe((data : JSON[]) => {
		  console.log(data)
		  //console.log(this.vendorAddress[i]);
		  for(let i = 0; i < data.length; i++)
		  {
		  if(data[i]['distance']['text'].includes('k'))
		  {
			   addressesToBeSorted[this.vendorAddress[i]] = data[i]['distance']['text'].replace(/[^0-9\.]+/g,"") * 1000;
			   units[this.vendorAddress[i]] = 'km';
		  }
		  else
		  {
				addressesToBeSorted[this.vendorAddress[i]] = data[i]['distance']['text'].replace(/[^0-9\.]+/g,"");
				units[this.vendorAddress[i]] = 'm';
		  }
		  console.log(addressesToBeSorted[this.vendorAddress[i]])
		  }
		});
	  for(var key in addressesToBeSorted)
	  {
		console.log(key, addressesToBeSorted[key]);
	  }
		setTimeout (() => {
			
		let sortedAddresses = (Object.keys(addressesToBeSorted).sort(function(a,b){return addressesToBeSorted[a]-addressesToBeSorted[b]}));
	    console.log(sortedAddresses);
		console.log(this.vendorsDict);
		setTimeout (() => {
		let sortedTitles = [];
		let sortedDistances = [];
		let sortedImages = [];
		let sortedAddresses2 = [];
		let sortedGenres = [];
		for(let i = 0; i < sortedAddresses.length; i++)
		{
			sortedTitles.push(this.vendorsDict[sortedAddresses[i]]);
			sortedImages.push(this.vendorsDictForImages[sortedAddresses[i]]);
			sortedGenres.push(this.vendorsDictForGenres[sortedAddresses[i]]);
			if(addressesToBeSorted[sortedAddresses[i]] >= 100) 
			{
				sortedDistances.push((addressesToBeSorted[sortedAddresses[i]]/1000) + units[sortedAddresses[i]]);
			}
			else
			{
				sortedDistances.push(addressesToBeSorted[sortedAddresses[i]] + units[sortedAddresses[i]]);
			}
			sortedAddresses2.push(sortedAddresses[i] + ";");
		}
		console.log(sortedTitles);
		console.log(sortedDistances);
		console.log(sortedImages);
		localStorage.setItem('newLocationFlag', '0');
		localStorage.setItem('orderedRestaurantTitles', sortedTitles.toString());
		localStorage.setItem('orderedRestaurantAddresses', sortedAddresses2.toString());
		localStorage.setItem('orderedRestaurantDistances', sortedDistances.toString());
		localStorage.setItem('orderedRestaurantImages', sortedImages.toString());
		localStorage.setItem('orderedRestaurantGenres', sortedGenres.toString());
		window.location.reload();
		}, 500);
		// store ordered restaurant titles, addresses, distances, and a sorted flag in local
		// refresh page
		// before populate: if local flagged, populate with localStorage; if not, do populateRestaurants()
		}, 1000);
	  // make a dictionary with keys as (name,address) and values as distances
	  // sort by value
	  // populate vendorTitle and vendorAddress with the names and addresses in the order of the dictionary (also populate new var vendor distance)
      }, 1000); // might have to update these times when more restaurants are added

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

}

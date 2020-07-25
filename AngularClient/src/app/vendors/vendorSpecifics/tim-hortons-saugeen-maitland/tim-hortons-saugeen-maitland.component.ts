import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogDemoComponent} from  './dialog-demo/dialog-demo.component';
import {TimHortonsSaugeenMaitlandService} from './tim-hortons-saugeen-maitland.service';


@Component({
  selector: 'app-tim-hortons-saugeen-maitland',
  templateUrl: './tim-hortons-saugeen-maitland.component.html',
  styleUrls: ['./tim-hortons-saugeen-maitland.component.css']
})
export class TimHortonsSaugeenMaitlandComponent implements OnInit {

public testData = ['Dark Roast Coffee','Coffee','Coffee','Coffee','Coffee','Coffee','Coffee','Coffee','Coffee','Coffee']
public itemData = [];
public itemTitlesCoffee = [];
public itemTitlesDonut = [];
public itemPicturesCoffee = [];
public itemPicturesDonut = [];
public itemPricesCoffee = [];
public itemPricesDonut = [];
public itemQuantitiesCoffee = [];
public itemQuantitiesDonut = [];

  public vendorService: TimHortonsSaugeenMaitlandService;

  constructor(public dialog: MatDialog, service: TimHortonsSaugeenMaitlandService) { 
		 this.vendorService = service;
		 this.vendorService.getItems('SaugeenMaitlandHall,London,ONN6G,Canada')
	 
    .subscribe(
	
	(data: JSON[]) => {
	console.log(data['0'])
	for(let i = 0; i < data.length; i++)
	{
		this.itemData.push(data[i])
		if(data[i]['category'] == 'Coffee')
		{
			this.itemTitlesCoffee.push(data[i]['name'])
			this.itemPicturesCoffee.push(data[i]['picture'])
			this.itemPricesCoffee.push(data[i]['price'])
			this.itemQuantitiesCoffee.push(0)
		}
		else if(data[i]['category'] == 'Donut')
		{
			this.itemTitlesDonut.push(data[i]['name'])
			this.itemPicturesDonut.push(data[i]['picture'])
			this.itemPricesDonut.push(data[i]['price'])
			this.itemQuantitiesDonut.push(0)
		}
	}
	console.log(this.itemData)
	});

  }

  ngOnInit() {
  }
	openDialog(food, index): void {
    const dialogRef = this.dialog.open(DialogDemoComponent, {
		// put info about the button just pressed here (is it a coffee, a donut, ...)
		data : [food,this.itemData,index],
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
	  if(result)
	  {
		  if(this.itemTitlesCoffee.includes(food))
		  {
			  this.itemQuantitiesCoffee[index] += 1
		  }
		  else if(this.itemTitlesDonut.includes(food))
		  {
			  this.itemQuantitiesDonut[index] += 1;
		  }
	  var cartJSON = {};
		cartJSON['vendor'] = "TimHortonsSaugeenMaitland";
		cartJSON['category'] = result[5];
		if(cartJSON['category'] == 'Coffee')
		{
			cartJSON['food'] = this.itemTitlesCoffee[index];
			cartJSON['quantity'] = this.itemQuantitiesCoffee[index];
		}
		else if(cartJSON['category'] == 'Donut')
		{
			cartJSON['food'] = this.itemTitlesDonut[index];
			cartJSON['quantity'] = this.itemTitlesDonut[index];
		}

		for(var i = 0; i < result[0].length; i++)
		{
			if(result[3][i] == true)
			{
				cartJSON[result[0][i]] = result[2][i].toString();
			}
			else
			{
				cartJSON[result[0][i]] = result[1][i].toString();
			}
		}
		cartJSON['notes'] = result[4];
		console.log(cartJSON);
		localStorage.setItem('cart',JSON.stringify(cartJSON));
		console.log(localStorage.getItem('cart'));
	  }
    });
  }
}

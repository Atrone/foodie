import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material';
import { DOCUMENT } from '@angular/common'; 

@Component({
  selector: 'app-dialog-demo',
  templateUrl: './dialog-demo.component.html',
  styleUrls: ['./dialog-demo.component.css']
})
export class DialogDemoComponent implements OnInit {
	
	public optionsData = [];
	public isQuantity = [];
	public quantity = [];
	public chosen = [];
	@Inject(DOCUMENT) document;
	public data2: any;
	public category: any;
  constructor(public dialogRef: MatDialogRef<DialogDemoComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any)
   {
	   this.data2 = data;
	   console.log(data);
		for(let i = 0; i < data[1].length; i++)
		{
			if(data[0] == data[1][i]['name'])
			{
				this.optionsData = data[1][i]['options'];
				this.isQuantity = data[1][i]['quantity'];
				this.category = data[1][i]['category'];
			}
		}
		for(let i = 0; i < this.isQuantity.length; i++)
		{
			this.quantity.push(0);
			this.chosen.push(false);
		}
   }

  ngOnInit() {
  }
  
onItemChange(value){
   console.log(" Value is : ", value );
   for(let i = 0; i < this.optionsData.length; i++)
   {
	   if(value == this.optionsData[i] && this.chosen[i] == false)
	   {
		   this.chosen[i] = true;
	   }
	   else if(value == this.optionsData[i] && this.chosen[i] == true)
	   {
		   this.chosen[i] = false;
	   }
   }
}

add(i)
{
	this.quantity[i] += 1;
}
sub(i)
{
		if(this.quantity[i] > 0)
		{
		this.quantity[i] -= 1;
		}
}

  
  save()
  {
	  this.dialogRef.close([this.optionsData,this.chosen,this.quantity,this.isQuantity,(<HTMLInputElement>document.getElementById('notes')).value,this.category]);
	  //console.log(this.data);
  }
  cancel()
  {
	  this.dialogRef.close();
  }

}

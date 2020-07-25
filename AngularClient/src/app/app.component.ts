import { Component, NgZone } from '@angular/core';
import {LoginServiceService} from './login-service.service';
import * as queryString from 'query-string';
import {Router} from "@angular/router"
import { DOCUMENT } from '@angular/common'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LoginServiceService]
})
export class AppComponent {
  public title = 'Mobileats@Western';
  public isAuthenticated: boolean;
  public loginURL = '';
  public loginService: LoginServiceService;
  public email = '';
  public flag = false;

  constructor(login: LoginServiceService, private router: Router, public zone: NgZone){
      this.loginService = login;
	  this.login();
	  if(window.location.search)
	  {
		  this.giveCode();		
		  setTimeout (() => {
		  this.router.navigate(['']);
		  if(this.email !== "unverified")
		  {
			  this.isAuthenticated = true;
			  setTimeout (() => {
			  window.location.reload();
			  }, 200);
		  }
		  else{}
		  }, 200);
	  }
	  else if(JSON.parse(localStorage.getItem('loggedIn')))
	  {
		  this.isAuthenticated = true;
		  console.log('hi');
		  console.log(localStorage.getItem('email'));
		  this.email = (localStorage.getItem('email'));
	  }
  }


  login() {
	 this.loginService.getLoginURL()
	 
    .subscribe(
	
	(data: string) => 
	
	this.loginURL = (data)
	
	);
		  console.log(this.loginURL + 'hi');	
	if(this.flag)
	{
		//this.isAuthenticated = true;
		document.location.href = this.loginURL;
	}
	else{this.flag = true;}
  }
  
  giveCode() // this actually gives code and then gets the email
  {
	const codeToSend = window.location.search.slice(6);
	console.log(codeToSend);
	this.loginService
  .postCode(codeToSend)
  .subscribe((id : String) => {
	  if(JSON.parse(JSON.stringify(id)).title2)
	  {		 
		this.email = JSON.parse(JSON.stringify(id)).title
		localStorage.setItem('loggedIn','true');
		localStorage.setItem('email',this.email);
		}
		else{this.email = "unverified"}
  });
	console.log(this.email);
  }
  

  logout() {
	  this.isAuthenticated = false;
	  this.email = "";
	  localStorage.setItem('loggedIn','false');
	  window.location.reload();
	  
  }
  
}

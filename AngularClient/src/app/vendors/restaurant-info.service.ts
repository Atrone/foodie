import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestaurantInfoService {

  constructor(private http: HttpClient) { }
  
  getRestaurants(){
    return this.http.get('http://localhost:8080/api/getRestaurants');
  }
  
  getDistance(userLocation, restaurantLocation)
  {  
  	return this.http.post('http://localhost:8080/api/distance', {orgin: userLocation, destination: restaurantLocation});
  }

}

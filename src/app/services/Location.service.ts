import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { CustomPosition } from '../tab1/Position';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
    
  location: CustomPosition | undefined;

  constructor() { 
      this.initPosition();
  }

    async initPosition()  {
      const response = await Geolocation.getCurrentPosition();
      this.setCustomPosition({
          latitude: response.coords.latitude, 
          longitude: response.coords.longitude
      }); 

  }


  setCustomPosition(pos: CustomPosition){
    this.location = pos;
  }

  public getPosition():CustomPosition {
    if(!this.location){
      this.initPosition();
    }
    return this.location; 

  }



  



  

   

  






}

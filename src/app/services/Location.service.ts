import { Injectable } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
    
  location: Promise<Position>;

  constructor() { 

  }

  printPosition() {
      console.log("start print Pos"); 


      const printPosition = async() => {
        console.log("print Pos"); 
        const coordinates = await Geolocation.getCurrentPosition();
        console.log("Current latitude: " + coordinates.coords.latitude);
        console.log("Current Longitude: " + coordinates.coords.longitude);

      };

      printPosition(); 
  }





}

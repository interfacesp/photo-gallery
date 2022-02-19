import { Component } from '@angular/core';
import  {LocationService} from '../services/Location.service'; 

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public locationService: LocationService) {}


  getLocation() {
    console.log("test");
    this.locationService.printPosition();
  }


  

}

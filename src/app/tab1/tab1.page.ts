import { Component, OnInit } from '@angular/core';
import  {LocationService} from '../services/Location.service'; 
import { CustomPosition } from './Position';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  currentPosition: CustomPosition;
  lati: number; 
  longi: number; 

  constructor(public locationService: LocationService) {}

  
  ngOnInit(): void {
    
  }


  showPosition(){
    const customPos = this.locationService.getPosition();
    this.lati = customPos.latitude;
    this.longi = customPos.longitude; 
  }



  

}

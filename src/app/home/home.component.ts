import { Component, OnInit } from '@angular/core';
import { Property } from './../property';
import { PropertyService } from './../property.service';
import { MapComponent } from './../map/map.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  properties: Property[] = [];
 constructor(private propertyService: PropertyService) { }
 ngOnInit(): void {
 this.propertyService.getProperties()
   .then(properties => this.properties = properties);
 }

}

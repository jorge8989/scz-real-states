import { Component, OnInit } from '@angular/core';
import { Property } from './../property';
import { GeoJson, FeatureCollection } from './../map';
import { PropertyService } from './../property.service';
import { MapComponent } from './../map/map.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
 constructor() { }
}

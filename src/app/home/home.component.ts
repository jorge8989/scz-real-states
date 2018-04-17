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
 properties: Property[] = [];
 markers: GeoJson[] = [];
 featureCollection: FeatureCollection;
 constructor(private propertyService: PropertyService) { }
 ngOnInit(): void {
 this.propertyService.getProperties()
   .then(properties => {
     this.properties = properties;
     this.properties.forEach((p) => {
       const propertyMarker = new GeoJson([p.longitude, p.latitude]);
       this.markers.push(propertyMarker);
     });
     this.featureCollection = new FeatureCollection(this.markers);
   });
 }

}

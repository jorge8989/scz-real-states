import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from './../map.service';
import { Property } from './../property';
import { GeoJson, FeatureCollection } from './../map';
import { PropertyService } from './../property.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  properties: Property[] = [];
  markers: GeoJson[] = [];
  featureCollection: FeatureCollection;
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v10';
  lat = -17.7833152;
  lng = -63.1843196;

  constructor(private mapService: MapService, private propertyService: PropertyService) {}

  private initializeMap() {
    this.buildMap();
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [this.lng, this.lat],
      zoom: 13,
    });
  }

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
    this.initializeMap();
  }

}

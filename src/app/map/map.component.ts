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
    this.map.on('load', (event) => {
      this.displayMarkers();
    });
  }

  displayMarkers() {
    const map = this.map;
    this.featureCollection.features.forEach((marker) => {
  // create a DOM element for the marker
    const el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = 'url(assets/images/green-home-icon.png)';
    el.style.width = '25px';
    el.style.height = '38px';
    el.style.backgroundSize = 'cover';
    el.style.cursor = 'pointer';

    // add marker to map
    new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .addTo(map);
    });
  }

  ngOnInit(): void {
  this.propertyService.getProperties()
    .then(properties => {
      properties.forEach((p) => {
        const { title, description, price, longitude, latitude } = p;
        const propertyMarker = new GeoJson([longitude, latitude], {title, description, price});
        this.markers.push(propertyMarker);
      });
      this.featureCollection = new FeatureCollection(this.markers);
    });

    this.initializeMap();
  }

  flyTo(data: GeoJson) {
    this.map.flyTo({
      center: data.geometry.coordinates,
    });
  }

}

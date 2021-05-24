import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import {NominatimServiceService} from '../../services/nominatim-service/nominatim-service.service'
import {NominatimResponse} from '../../model/nominatim-response/nominatim-response.model';

import Map from 'ol/Map';
import View from 'ol/View';
//import TileLayer from 'ol/layer/Tile';
import Point from 'ol/geom/Point';
import OSM from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj';
import {
  Circle as CircleStyle,
  Fill,
  Icon,
  Stroke,
  Style,
} from 'ol/style';
import {Tile as TileLayer, Vector as VectorLayer, Vector} from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Feature } from 'ol';

const iconRetinaUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconBlue = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconBlue;


const iconRed = L.icon({
  iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  iconUrl: 'assets/marker-icon.png',
  shadowUrl: 'assets/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map: any;
  searchResults: NominatimResponse[];

  constructor(private nominatimService: NominatimServiceService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap(): void {
    this.map = L.map('map', {
      center: [ 45.253107, 19.8499588 ],
      zoom: 13
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    L.marker([51.5, -0.09], {icon: iconBlue}).addTo(this.map);
    L.marker([40.0, -0.07]).addTo(this.map);

    var niz: Array<string> = ['Ticanova 3', 'Ticanova 1', 'Ticanova 3', 'Vrsacka 1', 'Ticanova 3', 'Ilirska 1', 'Ticanova 3'];
    var matrica: Array<Array<string>> = [];
    niz.sort();
    var predhodni: string = '';
    niz.forEach(e => {
      if(e === predhodni) {

      }
    });

    console.log(niz);
    niz.forEach(e => {
      this.addressLookup(e);
    });

    //this.addressLookup('Ticanova 3');
    //this.addressLookup('Ticanova 1');
  }

  addressLookup(address: string) {
    /*if (address.length > 3) {*/
      this.nominatimService.addressLookup(address).subscribe(results => {
        this.searchResults = results;
       // console.log(this.searchResults[0].displayName);
        this.searchResults.forEach(e => {
          //console.log(e.displayName + " " + e.latitude + " " + e.longitude);
          L.marker([e.latitude, e.longitude], {icon: iconRed}).addTo(this.map);
        });
      });
    /*} else {
      this.searchResults = [];
    }*/
    //console.log(this.searchResults);
    /*this.searchResults.forEach(e => {
      console.log(e.latitude +'   ' + e.longitude);
      L.marker([e.latitude, e.longitude]).addTo(this.map);
    });*/
    //L.marker([41, 18]).addTo(this.map);
  }

}

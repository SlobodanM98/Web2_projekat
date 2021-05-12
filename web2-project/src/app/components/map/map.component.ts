import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map: Map;

  constructor() { }

  ngOnInit(): void {
    const washingtonLonLat = [20.274088, 44.832960];
    const washingtonWebMercator = fromLonLat(washingtonLonLat);   
    this.map = new Map({
      view: new View({
        center: washingtonWebMercator,
        zoom: 8,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'ol-map'
    });

    var styles = {
      'carMarker': new Style({
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({color: 'blue'}),
          stroke: new Stroke({
            color: 'white',
            width: 2,
          }),
        }),
      }),
      'incidentMarker': new Style({
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({color: 'red'}),
          stroke: new Stroke({
            color: 'white',
            width: 2,
          }),
        }),
      }),
    };

    var layer = new VectorLayer({
      source: new VectorSource({
          features: [
              new Feature({
                  geometry: new Point(fromLonLat([20.35247, 44.84673])),
              })
          ],
      }),
      style: styles['carMarker']
    });

    this.map.addLayer(layer);
  }

}

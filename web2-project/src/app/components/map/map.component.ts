import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import {NominatimServiceService} from '../../services/nominatim-service/nominatim-service.service'
import {NominatimResponse} from '../../model/nominatim-response/nominatim-response.model';
import { SettingsService } from 'src/app/services/settings.service';
import { CallService } from 'src/app/services/call.service';
import { Address } from 'src/app/model/address';

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

  allAddresses : Array<Address>;

  constructor(private nominatimService: NominatimServiceService, private settingsService: SettingsService, private callService: CallService) { }

  ngOnInit(): void {
    this.settingsService.getAddress().subscribe(data =>{
      this.allAddresses = new Array<Address>();
      this.allAddresses = data;
    });
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

    this.settingsService.getSettings().subscribe(settings =>{
      var icon = L.icon({
        iconRetinaUrl: settings.callIcon,
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
      });

      var numberOfIconsPerAddress: {[id: number] : number} = {};

      this.allAddresses.forEach(element => {
        numberOfIconsPerAddress[element.addressID] = 0;
      });

      this.callService.getCalls().subscribe(data =>{
        data.forEach(element => {
          numberOfIconsPerAddress[element.address.addressID]++;
        });
        
        this.allAddresses.forEach(element => {
          if(numberOfIconsPerAddress[element.addressID] > 0){
            if(numberOfIconsPerAddress[element.addressID] > 5){
              icon.options.iconSize = [40, 60];
            }else{
              icon.options.iconSize = [25, 41];
            }

            this.addressLookup(element, icon);
          }
        });
      });
    });
  }

  addressLookup(address: Address, icon: L.Icon) {
    this.nominatimService.addressLookup(address).subscribe(results => {
      L.marker([results[0].latitude, results[0].longitude], {icon: icon}).addTo(this.map);
    });
  }
}

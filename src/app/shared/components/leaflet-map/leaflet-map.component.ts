import { Component, Input,  AfterViewInit  } from '@angular/core';
import * as L from 'leaflet';
import { LatLangService } from '../../services/lat-lang-service/lat-lang.service';
import { tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-leaflet-map',
  standalone: true,
  imports: [],
  templateUrl: './leaflet-map.component.html',
  styleUrl: './leaflet-map.component.scss'
})

export class LeafletMapComponent implements  AfterViewInit  {
  @Input() center: L.LatLngExpression = [ 52.95780, 4.75228 ];
  @Input() zoom = 18;

  private map: any;

  private initMap(): void {
    this.map = L.map('map', {
      center: this.center,
      zoom: 18,
      doubleClickZoom: false,
      zoomControl: false,
      dragging: false,
      scrollWheelZoom: false,
      touchZoom: false,
      boxZoom: false,
      keyboard: false,
      tap: false,
      attributionControl: true,
      layers: [
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          minZoom: 3,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        })
      ],
      zoomAnimation: true,
      fadeAnimation: true,
      markerZoomAnimation: true

    });
  }

  constructor(private latLangService: LatLangService) { 
  }
  
  ngOnInit() {
    this.latLangService.getLatLongFromAddress('1600 Amphitheatre Parkway, Mountain View').subscribe(
      res => {
        if (res && res.length > 0) {
          console.log('Latitude:', res[0].lat, 'Longitude:', res[0].lon);
        } else {
          console.log('No results found');
        }
      },
      error => {
        console.error(error);
      }
    );
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

}

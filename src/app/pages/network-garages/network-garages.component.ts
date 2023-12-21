import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from 'src/app/services/api-services.service';

@Component({
  selector: 'app-network-garages',
  templateUrl: './network-garages.component.html',
  styleUrls: ['./network-garages.component.scss']
})
export class NetworkGaragesComponent implements OnInit {

  constructor(private ApiServicesService:ApiServicesService) { }
  loginData:any;
  latitude:any;
  longitude:any;
  garage:any;

  ngOnInit(): void {
    this.loginData = JSON.parse(localStorage.getItem('loginToken'))
    this.getNearBygarage()
  }

  getNearBygarage(){
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          console.log('position',this.latitude,this.longitude);
          let asset = {
            "ServiceType": "PreInspection",
            "VehicleType": "",
            "Latitude":this.latitude,
            "Longitude":this.longitude,
            "Regionid":"",
            "Pincode":"",
            "State":"",
            "City":""
          }
          this.ApiServicesService.getToken().subscribe((data:any)=>{
            this.ApiServicesService.getNetworkGarage(asset, data).subscribe((data:any)=>{
              this.garage = JSON.parse(data)
               console.log("near garage",JSON.parse(data));
            })
          })
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
}

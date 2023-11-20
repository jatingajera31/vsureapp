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
  
  ngOnInit(): void {
    this.loginData = JSON.parse(localStorage.getItem('loginToken'))
    this.getNearBygarage()
  }

  getNearBygarage(){
    let asset = {
      "CustomerId":this.loginData.UserID,
      "EmployeeId":"",
      "EmployerId":"",
      "AdharId":"",
      "RegistrationNo":"",
      "PolicyNo":""
  }
    this.ApiServicesService.getToken().subscribe((data:any)=>{
      this.ApiServicesService.getNetworkGarage(asset, data).subscribe((data:any)=>{
        // this.vehicalList = JSON.parse(data)[0].Details[0].CustomerAssets
        // console.log("claim component",this.vehicalList);
      })
    })
  }
}

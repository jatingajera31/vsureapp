import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiServicesService } from 'src/app/services/api-services.service';

@Component({
  selector: 'app-my-claims',
  templateUrl: './my-claims.component.html',
  styleUrls: ['./my-claims.component.scss']
})
export class MyClaimsComponent implements OnInit {

  loginData:any;
  vehicalList:any;
  imageForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private ApiServicesService:ApiServicesService) { }

  ngOnInit(): void {
    this.loginData = JSON.parse(localStorage.getItem('loginToken'))
    this.imageForm = this.formBuilder.group({
      vehical:[]
    });
    this.getAllAssetList()

  }
  getAllAssetList(){
    let asset = {
      "CustomerId":this.loginData.UserID,
      "EmployeeId":"",
      "EmployerId":"",
      "AdharId":"",
      "RegistrationNo":"",
      "PolicyNo":""
  }
  
    this.ApiServicesService.getToken().subscribe((data:any)=>{
      this.ApiServicesService.getAssetList(asset, data).subscribe((data:any)=>{
        this.vehicalList = JSON.parse(data)[0].Details[0].CustomerAssets
        console.log("claim component",this.vehicalList);
      })
    })
  }

  onSubmit(){
    
  }
}

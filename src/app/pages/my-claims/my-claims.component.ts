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
  selectedOption:any
  filtered:any;
  claimlist:any;

  constructor(private formBuilder: FormBuilder,private ApiServicesService:ApiServicesService) { }

  ngOnInit(): void {
    this.loginData = JSON.parse(localStorage.getItem('loginToken'))
    this.imageForm = this.formBuilder.group({
      vehical:[]
    });
    this.getAllAssetList()
    this.onOptionsSelected()
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
  
  onOptionsSelected(event?: Event) {
    const selectedValue = (event?.target as HTMLSelectElement).value;
    // this.filtered = this.vehicalList.filter(t=> {
    //   if (t.CustRegistrationNo === selectedValue.toString()) {
    //     return t;
    //   }
    // });
    console.log('selectedOption',this.filtered);
    this.ApiServicesService.getToken().subscribe((data:any)=>{
    //   let asset = {
    //     "Cust_id":this.loginData.UserID,
    //     "CustEmailId":null,
    //     "Policy_no":this.filtered[0]?.CustAssetPolicyNo,
    //     "Alternate_Policy_no":this.filtered[0]?.CustAssetPolicyNo,
    //     "Claim_no":"MVO32088",
    //     "Vehicle_Registration_Number":this.filtered[0]?.CustRegistrationNo,
    //     "TieUpClaimNo":null
    // }
    let asset = {
      "Cust_id":this.loginData.UserID,
      "Policy_no":null,
      "CustEmailId":null,
      "Alternate_Policy_no":null,
      "Claim_no":null,
      "Vehicle_Registration_Number":null,
      "TieUpClaimNo":null
   
  }
      this.ApiServicesService.getClaimDetails(asset, data).subscribe((res:any)=>{
        console.log("claim detalis",res);
        this.claimlist = res[0]
      })
    })

  }

  onSubmit(){
    
  }
}

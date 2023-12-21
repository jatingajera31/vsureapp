import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from 'src/app/services/api-services.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  vehicalList: any;
  recentClaim: any;
  loginData:any;


  constructor(private ApiServicesService:ApiServicesService) { }

  ngOnInit(): void {
    this.vehicalList = [
      {
        type:"4 wheeler (MH46XY5300)",
        rNumber:"",
        model:"",
        color:"",
        fuel:""
      },
      {
        type:"2 wheeler (MH46XY5300)",
        rNumber:"",
        model:"",
        color:"",
        fuel:""
      }
    ]

    this.recentClaim = [
      {
        id:"2w",
        name:"MH46XY5300",
        date:"02 Feb 2022",
        view:"view"
      },
      {
        id:"2w",
        name:"MH46XY5300",
        date:"02 Feb 2022",
        view:"view"
      },
      {
        id:"2w",
        name:"MH46XY5300",
        date:"02 Feb 2022",
        view:"view"
      },
      {
        id:"2w",
        name:"MH46XY5300",
        date:"02 Feb 2022",
        view:"view"
      }
    ]
    this.loginData = JSON.parse(localStorage.getItem('loginToken'))
    this.getAllAssetList()
    // this.onOptionsSelected()
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
        console.log('vehicalList', this.vehicalList);
        // this.toastrService.success('successfully register')
        // this.router.navigate(['/']);
      })
    })
  }

  onOptionsSelected() {
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
        this.recentClaim = res[0]
      })
    })

  }


}

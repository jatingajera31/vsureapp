import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ApiServicesService } from 'src/app/services/api-services.service';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements OnInit {

  center: any = {lat: 24, lng: 12};
  zoom = 4;
  display:any;
  locationHistory:any
  loginData:any
  loginemail:any
  @Input() vehicle:any;
  @Output() getCliamIntimateData = new EventEmitter();

  ngOnInit(): void {
    this.loginData = JSON.parse(localStorage.getItem('loginToken'))
    this.loginemail = JSON.parse(localStorage.getItem('email'))

  }

  apiLoaded: Observable<boolean>;

  constructor(httpClient: HttpClient,public ApiServicesService:ApiServicesService) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyBjPR6FvJXicsfeQArfC8J9I9co4MR9S2Q', 'callback')
        .pipe(
          map(() => true),
          catchError(() => of(false)),
        );
        console.log("this.apiLoaded",this.apiLoaded);
        
  }

  moveMap(event: any) {
    this.center = (event.latLng.toJSON());
    this.ApiServicesService.getLocationHistroy(this.center).subscribe(res=>{
      this.locationHistory = res
      this.claimIntimation(this.locationHistory)
    })
  }

  claimIntimation(location:any){
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    // Months are zero-based (January is 0, December is 11)
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Add 1 to get the correct month
    const date = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${date}`;
    console.log("date",formattedDate); // Output: e.g., 2023-05-24 (for the current date)
    console.log('location',location);
    let Claims = {
      "ServiceType": "Intimation",
      "IsAutoSurveyorAppointment": "1",
      "UserId": this.loginData.UserID,
      "InsuranceCompany": "UATVI",
      "Claim": {
          "InsuranceCoPolicyNo": this.vehicle.CustAssetPolicyNo,
          "PolicyStartDate": "2022-05-24",
          "PolicyEndDate": "2023-05-24",
          "InsuredName": this.loginData.userName,
          "InsuredEmail": this.loginemail,
          "InsuredAadharNo": "314355326085",
          "Phone": "",
          "Fax": "",
          "IntimatorName": this.loginData.userName,
          "IntimatorMobileNo": "",
          "VehicleRegistrationNo": this.vehicle.CustRegistrationNo,
          "VehicleColor": this.vehicle.PaintType,
          "TypeOfClaim": "Motor",
          "DateOfIntimation": formattedDate,
          "LossType": "Accidental Damage",
          "LossPlace": location.address.county,
          "LossCity": location.address.state_district,
          "LossState": location.address.state,
          "AccidentPincode": location.address.postcode,
          "WorkshopMode": "0",
          "NameOfTrafficOfficer": "ssssss",
          "PoliceStationName": "ghatkopar",
          "PoliceReferenceNumber": "4543545",
          "Branch": "Mumbai"
          }
  }
    this.getCliamIntimateData.emit(Claims);
  }

  move(event: any) {
    this.display = event.latLng.toJSON();
  }

}

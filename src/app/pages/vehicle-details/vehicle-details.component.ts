import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonMessageComponent } from 'src/app/model/common-message/common-message.component';
import { ServiceRequestComponent } from 'src/app/model/service-request/service-request.component';
import { VehicleModelComponent } from 'src/app/model/vehicle-model/vehicle-model.component';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { VehicleService } from 'src/app/services/vehical.service';
import { ApiServicesService } from 'src/app/services/api-services.service';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss']
})
export class VehicleDetailsComponent implements OnInit {
  vehicalList: any;
  step = 0;
  name: string = "";
  color: string = "";
  detailOpen: boolean = false
  vehicleOpen: boolean = false
  fuel:any;
  loginData:any;
  public vehicalAdd: UntypedFormGroup;

  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  @Input()
  hideToggle: boolean = false;
  id: any;
  makeData: any;
  modelData: any;
  vehicletype:any

  constructor(public dialog: MatDialog, private fb: UntypedFormBuilder,

    private vehicalService: VehicleService,private ApiServicesService:ApiServicesService
  ) {
    this.getMake('TwoWheeler')
    // if (this.vehicalAdd.value.Make) {
    //   console.log("makeId", this.vehicalAdd.value.Make);


    //   this.vehicalService.getModalData(this.vehicalAdd.value.Make).subscribe((res: any) => {
    //     let data = JSON.parse(res).Table;
    //     console.log("data", data)
    //   })

    // }




    this.vehicalAdd = fb.group({
      AssetType: new FormControl('', Validators.required),
      Make: ['', Validators.required],
      Model: ['', Validators.required],
      Variant: ['', Validators.required],
      FuelType: ['', Validators.required],
      ManufacturingYear: ['', Validators.required],
      IMEINo: ['', Validators.required],
      physicalAddress: ['', Validators.required],
      postalAddress: ['', Validators.required],
      Remarks: ['', Validators.required],
    });

  }
  get cityName() {
    return this.vehicalAdd.get('Make');
  }
  // how to get value of makeId

  getMake(vtype?:any){
    this.vehicalService.getMakeData(this.id).subscribe((res: any) => {
      if(vtype === 'TwoWheeler'){
        this.makeData = JSON.parse(res).Table.filter((i:any)=>{  if(i.Vehicle_Type === 'TwoWheeler')return i });
        this.fuelType(vtype)
      } else if(vtype === 'PrivateCar'){
        this.makeData = JSON.parse(res).Table.filter((i:any)=>{  if(i.Vehicle_Type === 'PrivateCar') return i });
        this.fuelType(vtype)
      }
    })
  }

  vehicleType(type){
    console.log('type',type);
    this.vehicletype = type
    this.getMake(this.vehicletype)
   }

  fuelType(vtype){
    let payload = {
      "LovGroupCode": vtype,
      "ClaimType": "WarrantyHealthCheckUp",
      "SurveyType": "Warranty",
      "Mode": "NON GARAGE",
      "VehicleType": "",
      "Deployment": "Telkom"
    }
    this.vehicalService.getFuel(payload).subscribe((res: any) => {
     this.fuel = JSON.parse(res);
     console.log("fuel",this.fuel);
     
    })
  }

  onMakeChange($event: any) {
    console.log("cityName", this.cityName);
    console.log("event", $event.target.value);
    $event.target.value.split(",")[0];
    $event.target.value.split(",")[1];
    const data = {
      MakeId: $event.target.value.split(",")[0],
      VehicleType: $event.target.value.split(",")[1]
    }
    console.log("data", data);

    this.vehicalService.getModalData(data).subscribe((res: any) => {
      this.modelData = JSON.parse(res).Table;
      console.log("data", res)
    })
  }
  ngOnInit(): void {
    this.loginData = JSON.parse(localStorage.getItem('loginToken'))
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
        // this.toastrService.success('successfully register')
        // this.router.navigate(['/']);
      })
    })
  }

  setStep(index: number) {
    this.step = index;
  }

  headerClickOpen(num: number) {
    this.getAllAssetList()
    if (num == 0) {
      this.detailOpen = true
    } else if (num == 1) {
      this.vehicleOpen = true
    }
  }

  headerClickClose(num: number) {
    if (num == 0) {
      this.detailOpen = false
    } else if (num == 1) {
      this.vehicleOpen = false
    }
  }

  openVehicleDialog(vehicle: any) {
    console.log('vehicle',vehicle);
    const dialogRef = this.dialog.open(VehicleModelComponent, {
      data: { vehicle: vehicle },
      maxWidth: '100vw',
    });
    dialogRef.afterClosed().subscribe(res => {
      this.color = res;
    });
  }

  registerAsset() {
    console.log("add vehical form", this.vehicalAdd.value)
    const data = {
      EmailId:localStorage.getItem('email'),
      AssetType: this.vehicalAdd.value.AssetType,
      Make: this.vehicalAdd.value.Make.split(",")[0],
      Model: this.vehicalAdd.value.Model.split(",")[0],
      Variant: this.vehicalAdd.value.Variant,
      FuelType: this.vehicalAdd.value.FuelType,
      ManufacturingYear: this.vehicalAdd.value.ManufacturingYear,
      IMEINo: this.vehicalAdd.value.IMEINo,
      physicalAddress: this.vehicalAdd.value.physicalAddress,
      postalAddress: this.vehicalAdd.value.postalAddress,
      Remarks: this.vehicalAdd.value.Remarks,
    }
    console.log("data", data);
    this.vehicalService.RegisterAsset(data).subscribe((res: any) => {
      console.log("res", res);
      
      // if (res) {
        console.log("res", res);
        const dialogRef = this.dialog.open(CommonMessageComponent, {
          data: { message: 'Vehicle added successfully!', button: true, component: 'service' },
          maxWidth: '100vw',
        });
        dialogRef.afterClosed().subscribe(res => {
        });
      }
    // }
    )


  }

}

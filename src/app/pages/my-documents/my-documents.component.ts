import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiServicesService } from 'src/app/services/api-services.service';
import { VehicleService } from 'src/app/services/vehical.service';

@Component({
  selector: 'app-my-documents',
  templateUrl: './my-documents.component.html',
  styleUrls: ['./my-documents.component.scss']
})
export class MyDocumentsComponent implements OnInit {

  imageForm: FormGroup;
  fileName:any;
  loginData:any;
  vehicalList:any;

  constructor(private formBuilder: FormBuilder,private ApiServicesService:ApiServicesService,private vehicalService: VehicleService) { }

  ngOnInit() {
    this.loginData = JSON.parse(localStorage.getItem('loginToken'))
    this.imageForm = this.formBuilder.group({
      imageFile: [null], // FormControl for the image file
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
        console.log("vehical list",this.vehicalList);
        
        // this.toastrService.success('successfully register')
        // this.router.navigate(['/']);
      })
    })
  }
  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      console.log("file",file)
      this.fileName = file.name
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageForm.patchValue({
          imageFile: reader.result // Set the base64 string to the form control
        });
      };
      console.log("imageFile",reader.result); 
      
    }
  }

  onSubmit() {
    // Handle form submission and send the base64 image string
    const base64Image = this.imageForm.get('imageFile').value;
    var dataWithoutPrefix = base64Image.substring(base64Image.indexOf(',') + 1)
    console.log('Base64 Image:', base64Image);
    console.log("this.imageForm.value.vehical",this.imageForm.value.vehical);
    console.log("this.imageForm.value.vehical.split(",")[0]",this.imageForm.value.vehical.split(",")[0]);
    
    let uploadFile = {
      "ServiceNumber": this.imageForm.value.vehical.split(",")[0], //assestid
      "Service": "CustAsstService",
      "Latitude": "",
      "Longitude": "",
      "FileStream": dataWithoutPrefix, //base64bit
      "FileName": this.fileName,
      "Category": "Driving License",
      "PhotoType": "Document Photos"
  }
    // Call API or perform any other action with the base64 image
    console.log("dataWithoutPrefix",dataWithoutPrefix)

this.vehicalService.fileUpload(uploadFile).subscribe((res:any)=>{
console.log("res",res)
})
  }
}
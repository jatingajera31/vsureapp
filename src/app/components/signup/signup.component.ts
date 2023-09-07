import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiServicesService } from 'src/app/services/api-services.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public contactForm: UntypedFormGroup;
  disabledSubmitButton: boolean = true;
  passwordShow:boolean = false
  confirmPasswordShow:boolean = false

  registerForm!: FormGroup;
  submitted = false;

  constructor(private fb: UntypedFormBuilder,private formBuilder: FormBuilder,private toastrService: ToastrService, private http: HttpClient,private router: Router, private apiService:ApiServicesService) {
    this.contactForm = fb.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'mobile': ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),Validators.maxLength(10)]],
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'password': ['', Validators.required],
      'confirmPassword': ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        mobile: ['', [Validators.required,Validators.minLength(10)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      }
    );
  }

  get f() {
    return this.registerForm.controls;
  }


  handleConfirmPassShow() {
    this.confirmPasswordShow = !this.confirmPasswordShow
  }

  handlePassShow() {
    this.passwordShow = !this.passwordShow 
  }


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    let data = this.registerForm.value
    if(data.firstName && data.password && data.email && data.mobile){
      let user = 	{
      "CustomerName": data.firstName,
      "Password": data.password,
      "PostalAddress":"",
      "PhysicalAddress":"",
      "PostalCode":"",
      "PhoneNo":"",
      "EmailId": data.email,
      "MobileNo": data.mobile,
      "CellNo":"0",
      }

      if(data.password !== data.confirmPassword){
        this.toastrService.error('Password and Confirm password are not Same.')
        return;
      }
      this.apiService.getToken().subscribe((data:any)=>{
        this.apiService.registerUser(user, data).subscribe((data:any)=>{
          console.log("data",data);
          this.toastrService.success('successfully register')
          this.router.navigate(['/']);
        })
      })
     
    }else{
      this.toastrService.error('please fill all fileds')
    }
    
  }

}

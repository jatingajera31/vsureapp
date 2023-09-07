import { Component, OnInit, HostListener } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiServicesService } from 'src/app/services/api-services.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  disabledSubmitButton: boolean = true;
  passwordShow: boolean = false

  registerForm!: FormGroup;
  submitted = false;

  constructor(private fb: UntypedFormBuilder, private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private apiService: ApiServicesService,

    private toastr: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        'contactFormName': ['', Validators.required],
        'contactFormPassword': ['', Validators.required],
      }
    );
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    let data = this.registerForm.value
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    if (data.contactFormName && data.contactFormPassword) {
      let user = {
        "UserName": data.contactFormName,
        "password": data.contactFormPassword,
        "grant_type": "password",
      }
      this.apiService.SignIn(user)
        .subscribe((data: any) => {
          console.log("data", data);
          localStorage.setItem('email',this.registerForm.value.contactFormName)
          localStorage.setItem("access_token", data.access_token)
          localStorage.setItem("loginToken", JSON.stringify(data))

          this.toastr.success('Login Successfully');
          this.router.navigate(['/dashboard']);
        }, (err: any) => {
          console.log("data", err);
          this.toastr.error(err.error.error_description)
          alert(err.error.error_description)
        })
    } else {
      alert('please fill all fileds')
    }
  }

  signupPage() {
    this.router.navigateByUrl('/signup')
  }

  handlePassShow() {
    this.passwordShow = !this.passwordShow
  }

}

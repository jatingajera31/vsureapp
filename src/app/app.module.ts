import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderComponent } from './common/header/header.component';
import { VehicleDetailsComponent } from './pages/vehicle-details/vehicle-details.component';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { VehicleModelComponent } from './model/vehicle-model/vehicle-model.component';
import { ServiceRequestComponent } from './model/service-request/service-request.component';
import { GoogleMapsComponent } from './pages/google-maps/google-maps.component';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatRadioModule } from '@angular/material/radio';
import { CommonMessageComponent } from './model/common-message/common-message.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SelectServiceComponent } from './pages/select-service/select-service.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { WelcomeComponent } from './common/welcome/welcome.component';
import { ApprovedColorComponent } from './common/approved-color/approved-color.component';
import { MyPlansComponent } from './pages/my-plans/my-plans.component';
import { MyClaimsComponent } from './pages/my-claims/my-claims.component';
import { MyDocumentsComponent } from './pages/my-documents/my-documents.component';
import { NetworkGaragesComponent } from './pages/network-garages/network-garages.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { ToastrModule } from 'ngx-toastr';
import { AgmCoreModule } from '@agm/core';

@NgModule({
    declarations: [
        AppComponent,
        SigninComponent,
        SignupComponent,
        DashboardComponent,
        HeaderComponent,
        VehicleDetailsComponent,
        VehicleModelComponent,
        ServiceRequestComponent,
        GoogleMapsComponent,
        CommonMessageComponent,
        SelectServiceComponent,
        WelcomeComponent,
        ApprovedColorComponent,
        MyPlansComponent,
        MyClaimsComponent,
        MyDocumentsComponent,
        NetworkGaragesComponent,
        ContactUsComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MDBBootstrapModule.forRoot(),
        ToastrModule.forRoot({}),
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatSidenavModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatSnackBarModule,
        MatExpansionModule,
        MatDialogModule,
        MatFormFieldModule,
        HttpClientModule,
        HttpClientJsonpModule,
        GoogleMapsModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatGridListModule,
        AgmCoreModule.forRoot({apiKey: 'AIzaSyAvcDy5ZYc2ujCS6TTtI3RYX5QmuoV8Ffw'}),
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-top-right',
            preventDuplicates: true,

        }),
    ],
    providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [
        GoogleMapsComponent,
    ]
})
export class AppModule { }

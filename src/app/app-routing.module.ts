import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovedColorComponent } from './common/approved-color/approved-color.component';
import { HeaderComponent } from './common/header/header.component';
import { WelcomeComponent } from './common/welcome/welcome.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MyClaimsComponent } from './pages/my-claims/my-claims.component';
import { MyDocumentsComponent } from './pages/my-documents/my-documents.component';
import { MyPlansComponent } from './pages/my-plans/my-plans.component';
import { NetworkGaragesComponent } from './pages/network-garages/network-garages.component';
import { SelectServiceComponent } from './pages/select-service/select-service.component';
import { VehicleAssistanceComponent } from './pages/vehicle-assistance/vehicle-assistance.component';
import { VehicleDetailsComponent } from './pages/vehicle-details/vehicle-details.component';

const routes: Routes = [
  { path: '', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'color-choice', component: ApprovedColorComponent },
  // { path: 'dashboard', component: HeaderComponent },
  // { path: 'vehicle-details', component: VehicleDetailsComponent },
  {
    path: '',
    component: HeaderComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'vehicle-details',
        component: VehicleDetailsComponent
      },
      {
        path: 'my-claims',
        component: MyClaimsComponent
      },
      {
        path: 'my-documents',
        component: MyDocumentsComponent
      },
      {
        path: 'my-plans',
        component: MyPlansComponent
      },
      {
        path: 'network-garages',
        component: NetworkGaragesComponent
      },
      {
        path: 'vehicleAssistance',
        component: VehicleAssistanceComponent
      },
      {
        path: 'contactUs',
        component: ContactUsComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

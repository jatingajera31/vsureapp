import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {

  constructor(private http:HttpClient) { }
  headers:any;

  getToken(){
    const authHttpOptions = { headers: new HttpHeaders({})}
    return this.http.post(`https://vieva.in:9022/token`, 'UserName=' + '20062017' + '&password=' + '4M2farFqRF/knOGBv5DFrw==' + '&grant_type=password', authHttpOptions).pipe(map((res: any)=>res))
  }

  getLocationHistroy(event:any){
    return this.http.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${event.lat}&lon=${event.lng}`)
  }

  SignIn(user:any):any{
    const authHttpOptions = { headers: new HttpHeaders({})}
    return this.http.post(`https://vieva.in:9022/token`, 'UserName=' + user.UserName + '&password=' + user.password + '&grant_type=password', authHttpOptions).pipe(map((res: any)=>res))
  }

  getAssetList(user:any,auth_token:any){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${auth_token.access_token}`);
      return this.http.post(`https://vieva.in:9022/GetLoadCustomerData`,user , {headers: headers });
  }

  getClaimDetails(user:any,auth_token:any){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${auth_token.access_token}`);
      return this.http.post(`https://vieva.in:9022/ClaimDetail`,user , {headers: headers });
  }

  

  getNetworkGarage(user:any,auth_token:any){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${auth_token.access_token}`);
      return this.http.post(`https://vieva.in:9022/GetLoadCustomerData`,user , {headers: headers });
  }

  getServices(user:any,auth_token:any){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${auth_token.access_token}`);
      return this.http.post(`https://vieva.in:9022/GetLovsdata`,user , {headers: headers });
  }

  getDocumentImg(user:any,auth_token:any){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${auth_token.access_token}`);
      return this.http.post(`https://vieva.in:9022/GetPhotosDocuments`,user , {headers: headers });
  }

  deletePhotoDocs(user:any,auth_token:any){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${auth_token.access_token}`);
      return this.http.post(`https://vieva.in:9022/DeleteDocument`,user , {headers: headers });
  }

  registerUser(user:any,auth_token:any){
    console.log("servide auth token", auth_token.access_token)
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', `Bearer ${auth_token.access_token}`);
    return this.http.post(`https://vieva.in:9022/RegisterCustomer`,user , {headers: headers });
  }
  
  claimRegister(user:any,auth_token:any){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${auth_token.access_token}`);
      return this.http.post(`https://vieva.in:9022/ICIntimation`,user , {headers: headers });
  }
}

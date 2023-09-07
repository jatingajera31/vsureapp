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

  registerUser(user:any,auth_token:any){
    console.log("servide auth token", auth_token.access_token)
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', `Bearer ${auth_token.access_token}`);
    return this.http.post(`https://vieva.in:9022/RegisterCustomer`,user , {headers: headers });
  }
}

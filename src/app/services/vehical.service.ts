import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpHelper } from '../common copy/http-header/http-header.class';

@Injectable({
    providedIn: 'root'
})
export class VehicleService extends HttpHelper {

    constructor(private http: HttpClient) {
        super();
    }
    headers: any;

    getModalData(data) {
        return this.http.post(`${this.apiUrl}/getModel`, data, this.getHttpOptions());
    }

    getMakeData(id) {

        return this.http.post(`${this.apiUrl}/getMake`, id, this.getHttpOptions());

    }
    RegisterAsset = (data) => {
        return this.http.post(`${this.apiUrl}/RegisterAsset`, data, this.getHttpOptions());
    }

    fileUpload = (data) => {
        return this.http.post(`${this.apiUrl}/DocumentUpload`, data, this.getHttpOptions());
    }

}

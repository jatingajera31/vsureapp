import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CommonMessageComponent } from '../common-message/common-message.component';

@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.component.html',
  styleUrls: ['./service-request.component.scss']
})
export class ServiceRequestComponent implements OnInit {
  isEmergency:boolean = false;
  isSelect:boolean = false;
  isSelectVal:string = "";
  apiLoaded: Observable<boolean>;
  optionsSelect: Array<any>;
  locationText:any

  constructor(
    public dialogRef: MatDialogRef<ServiceRequestComponent>,
    public dialogRefCommon: MatDialogRef<CommonMessageComponent>,
    public dialog: MatDialog,
    httpClient: HttpClient
  ){
    this.optionsSelect = [
      { value: '0', label: 'Select' },
      { value: '1', label: 'Vehicle not starting Flat Tyre Empty Fuel tank Key Lost/Locked Other' },
      { value: '2', label: 'Pick up & Drop' },
      { value: '3', label: 'Doorstep Service' },
      { value: '4', label: 'Other' },
    ]
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyBjPR6FvJXicsfeQArfC8J9I9co4MR9S2Q', 'callback')
    .pipe(
      map(() => true),
      catchError(() => of(false)),
    );
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  handleType(event:any){
    console.log("event==",event.target.name, event.target.value);
    this.isSelect = true;
    if(event.target.value == 'Emergency'){
      this.isEmergency = true
    }else{
      this.isEmergency = false
    }
  }

  getValue(event:any) {
    console.log(event.target.value);
    this.isSelectVal = event.target.value
  }

  commonMessageShow(){
    this.dialogRef.close();
    const dialogRefCommon = this.dialog.open(CommonMessageComponent, {
      maxWidth: '100vw',
      data: { message: 'Your request has been successfully registered; You will receive a call back from our Assistance Centre.' }
    });
    dialogRefCommon.afterClosed().subscribe((res:any) => {
      console.log("res---",res);
      
    });
  }

}

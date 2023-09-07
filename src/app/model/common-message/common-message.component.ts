import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceRequestComponent } from '../service-request/service-request.component';

@Component({
  selector: 'app-common-message',
  templateUrl: './common-message.component.html',
  styleUrls: ['./common-message.component.scss']
})
export class CommonMessageComponent implements OnInit {

  message:any
  button:any
  component:any
    
  constructor(
    public dialogRef: MatDialogRef<CommonMessageComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) 
  { }

  ngOnInit(): void {
    this.message = this.data?.message
    this.button = this.data?.button
    this.component = this.data?.component
    console.log("this.message",this.message);
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openServiceDialog(){
    this.dialogRef.close();
    const dialogRefSer = this.dialog.open(ServiceRequestComponent, {
      // data: { this.message:vehicle },
      maxWidth: '100vw',
    });
    dialogRefSer.afterClosed().subscribe(res => {
    });
  }

}

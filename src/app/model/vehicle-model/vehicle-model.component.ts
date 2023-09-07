import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ServiceRequestComponent } from '../service-request/service-request.component';

@Component({
  selector: 'app-vehicle-model',
  templateUrl: './vehicle-model.component.html',
  styleUrls: ['./vehicle-model.component.scss']
})
export class VehicleModelComponent implements OnInit {
  vehicle:any
  constructor(
    public dialogRef: MatDialogRef<VehicleModelComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) 
  { }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.vehicle = this.data.vehicle
    console.log("data---",this.data, this.vehicle);
  }

  openServiceDialog(){
    const dialogRef = this.dialog.open(ServiceRequestComponent, {
      maxWidth: '100vw',
      // data: { vehicle:vehicle }
    });
    dialogRef.afterClosed().subscribe((res:any) => {
      console.log("res---",res);
      
    });
  }

}

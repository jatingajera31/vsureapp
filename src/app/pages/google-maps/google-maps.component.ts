import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ApiServicesService } from 'src/app/services/api-services.service';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements OnInit {

  center: any = {lat: 24, lng: 12};
  zoom = 4;
  display:any;

  ngOnInit(): void {
  }

  apiLoaded: Observable<boolean>;

  constructor(httpClient: HttpClient,public ApiServicesService:ApiServicesService) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyBjPR6FvJXicsfeQArfC8J9I9co4MR9S2Q', 'callback')
        .pipe(
          map(() => true),
          catchError(() => of(false)),
        );
        console.log("this.apiLoaded",this.apiLoaded);
        
  }

  moveMap(event: any) {
    this.center = (event.latLng.toJSON());
    this.ApiServicesService.getLocationHistroy(this.center).subscribe(res=>{
      console.log('location history',res );
    })
  }

  move(event: any) {
    this.display = event.latLng.toJSON();
  }

}

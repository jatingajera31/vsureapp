import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  vehicalList: any;
  recentClaim: any;

  constructor() { }

  ngOnInit(): void {
    this.vehicalList = [
      {
        type:"4 wheeler (MH46XY5300)",
        rNumber:"",
        model:"",
        color:"",
        fuel:""
      },
      {
        type:"2 wheeler (MH46XY5300)",
        rNumber:"",
        model:"",
        color:"",
        fuel:""
      }
    ]

    this.recentClaim = [
      {
        id:"2w",
        name:"MH46XY5300",
        date:"02 Feb 2022",
        view:"view"
      },
      {
        id:"2w",
        name:"MH46XY5300",
        date:"02 Feb 2022",
        view:"view"
      },
      {
        id:"2w",
        name:"MH46XY5300",
        date:"02 Feb 2022",
        view:"view"
      },
      {
        id:"2w",
        name:"MH46XY5300",
        date:"02 Feb 2022",
        view:"view"
      }
    ]
  }

}

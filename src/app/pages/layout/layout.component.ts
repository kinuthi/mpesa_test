import { Component, OnInit } from '@angular/core';
import {  NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit  {
  currentUrl : any;
  constructor( private router : Router) { } 

  async ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = this.router.url;
      }
    });
  
  }
}

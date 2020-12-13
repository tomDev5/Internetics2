import { Component, OnInit } from '@angular/core';
import { MyService } from '../../services/MyService.service'
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  logout(){
    this.myService.logout()
  }

  constructor(private myService:MyService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    //console.log(window.location.href.split('//')[1].split('/')[1])
    //console.log(window.location.href.split('/')[3])
    let currentTab = document.getElementById('btn-'+window.location.href.split('/')[3])
    currentTab?.classList.add('active')
  }

}

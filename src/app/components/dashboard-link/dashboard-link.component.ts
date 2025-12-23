import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-link',
  templateUrl: './dashboard-link.component.html',
  styleUrls: ['./dashboard-link.component.scss'],
  standalone: true,
})
export class DashboardLinkComponent  implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {}

  goToDashboard(){
    this.router.navigate(['tabs/dashboard'])
  }

}

import { Component, OnInit } from '@angular/core';
import { IonTitle, IonHeader,IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  standalone: true,
  imports:[IonTitle,IonHeader,IonToolbar]
})
export class AppHeaderComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}

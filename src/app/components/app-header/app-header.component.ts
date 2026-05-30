import { Component, OnInit } from '@angular/core';
import { IonTitle, IonHeader,IonToolbar ,IonButton, IonIcon} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { personCircleOutline } from 'ionicons/icons';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  standalone: true,
  imports:[IonTitle,IonHeader,IonToolbar, IonButton, IonIcon]
})
export class AppHeaderComponent  implements OnInit {

  constructor(private router:Router, private navCtrl: NavController ) { 
    addIcons({
      personCircleOutline
    });
  }

  userName : string= ''

  ngOnInit() {
    this.userName=localStorage.getItem('name')||''
  }

  onLogoutClick(){
    console.log("Logout button is clicked");
      localStorage.clear();
      this.navCtrl.navigateRoot('/login');
  }

}

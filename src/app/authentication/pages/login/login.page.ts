import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonItem, IonLabel,IonInput,IonButton } from '@ionic/angular/standalone';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validator, Form, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import {Router} from '@angular/router';
import { NavController } from '@ionic/angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, RouterLink,IonHeader, IonTitle,ReactiveFormsModule, IonToolbar, CommonModule, IonItem, IonLabel,IonInput,IonButton]
})
export class LoginPage implements OnInit {

  constructor(private fb: FormBuilder, private authService:AuthService, private router:Router,
    private navCtrl: NavController 
  ) { }

  loginForm!:FormGroup

  ngOnInit() {
    this.loginForm = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(6)]]
    })
  }

  onLoginClick(){
    console.log("Login button clicked");
    console.log("These are login form values", this.loginForm.value)
    this.authService.login(this.loginForm.value).subscribe({
      next:(res:any)=>{
        console.log(res);
        localStorage.setItem('token',res.token);
        localStorage.setItem('name', res.name);
        localStorage.setItem('email', res.email);
        //window.location.href = '/tabs/dashboard';
        setTimeout(() => {
          this.navCtrl.navigateRoot('/tabs/dashboard');
        }, 100)
      },
      error:(err)=>{console.log(err)}
    })
  }

}

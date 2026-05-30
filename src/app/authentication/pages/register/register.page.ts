import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule , Validators} from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButton, IonItem, IonLabel, IonInput} from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, RouterLink, IonTitle, IonToolbar, CommonModule, ReactiveFormsModule, IonButton,IonInput, IonItem, IonLabel]
})
export class RegisterPage implements OnInit {

  registerForm!: FormGroup;

  constructor(private fb:FormBuilder, private authService:AuthService, private router:Router) { }

  ngOnInit() {
    this.registerForm=this.fb.group({
      name:['', Validators.required],
      email:['',[Validators.required, Validators.email] ],
      password:['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onRegisterClick(){
   this.authService.register(this.registerForm.value).subscribe({
    next:(res)=>{
      console.log(res)
      this.router.navigate(['/login']);
    },
    error:(err)=>{console.log(err)}
   })
  }

}

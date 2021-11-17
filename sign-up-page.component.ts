import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent implements OnInit {

  constructor(private authService:AuthService,private rout:Router) { }

  ngOnInit(): void {
  }
  OnSignupButtonClicked(email:string,password:string){
    this.authService.signup(email,password).subscribe((res)=>{
        this.rout.navigateByUrl(`/login`)
    }); 
  }

}

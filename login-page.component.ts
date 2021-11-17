import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { user } from 'src/app/models/user';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private authService:AuthService,private rout:Router) { }

  ngOnInit(): void {
  }
  OnLoginButtonClicked(email:string,password:string){
    this.authService.login(email,password).subscribe((res)=>{
      /*if(res == "user not found")
      {
        console.log("mesh mazboot")
        //this.rout.navigate(['http://localhost:4200/login'])
      }
      else
      {
        console.log("mazboot")
        //this.rout.navigate(['/todo/6193dcb5f5621401da1d9b1d'])
      }*/
      this.rout.navigate(['/todo/6193dcb5f5621401da1d9b1d'])
    }); 
  }

}

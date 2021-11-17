import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private webService:WebRequestService, private router:Router) { }
  login(email: string, password: string) {
    return this.webService.login(email, password)/*.pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // the auth tokens will be in the header of this response
        this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
        console.log("LOGGED IN!");
      })
    )*/
  }
  logout(){
    
  }
}

import { Injectable } from '@angular/core';


import { AuthenticationService } from './authentication.service';
@Injectable({
  providedIn: 'root'
})
export class AuthenGuardService {

  constructor(
    public authenticacionService: AuthenticationService
  ) {

   }

   canActivate():boolean{
    console.log('estado'+this.authenticacionService.isAuthenticated());
    return this.authenticacionService.isAuthenticated();
  }

}

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {SubmitService} from './submit.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (private submitService: SubmitService, private router: Router) {}
  canActivate(): boolean {
    if (this.submitService.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

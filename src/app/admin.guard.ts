import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {SubmitService} from './submit.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(private router: Router, private submitService: SubmitService) {
    }

    canActivate(): boolean {
        if (this.submitService.loggedAsAdmin()) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }

}

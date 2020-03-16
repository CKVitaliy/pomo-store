import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {Router} from '@angular/router';
import {InteractionService} from './interaction.service';
import {Store} from '@ngrx/store';
import {logIn, logOut} from './Store/Actions/user.actions';

@Injectable({
    providedIn: 'root'
})
export class SubmitService {

    constructor(
        private http: HttpClient,
        private router: Router,
        private _interactionService: InteractionService,
        private store: Store<{user: any}>) {
    }

    postData(url, data) {
        const httpOptions = {
            headers: new HttpHeaders({
                /*                'Content-Type': 'multipart/form-data',*/
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            })
        };
        return this.http.post(url, data, httpOptions).pipe(catchError(this.errorHandler));
    }

    getData(url) {
        return this.http.get(url).pipe(catchError(this.errorHandler));
    }

    deleteData(url) {
        return this.http.delete(url).pipe(catchError(this.errorHandler));
    }

        errorHandler(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(`Backend returned code ${error.status}. Body was: ${error.statusText}`);
        }
        return throwError(error);
    }

    loggedIn() {
        return !!localStorage.getItem('token');
    }

    loggedAsAdmin() {
        if (localStorage.getItem('token') && (localStorage.getItem('adminRights') === 'true')) { return true; }
    }

    loggedOut() {
        this.store.dispatch(logOut());
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('chosenProducts');
        localStorage.removeItem('adminRights');
        this._interactionService.changeMessage(0);
        this.router.navigate(['/allCategories']);
    }
}

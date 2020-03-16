import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {SubmitService} from '../submit.service';
import {Store} from '@ngrx/store';
import {logIn} from '../Store/Actions/user.actions';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    RF: FormGroup;
    successMessage;
    errorMessage;

    constructor(
        private fb: FormBuilder,
        private submitService: SubmitService,
        private store: Store<{user: any}>) {
    }

    ngOnInit() {
        this.RF = this.fb.group({
            email: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }

    login() {
        const newUser = {
            email: this.RF.get('email').value,
            password: this.RF.get('password').value
        };
        this.submitService.postData('http://localhost:3000/login', newUser).subscribe(
            (data: any) => {
                console.log(data);
                this.store.dispatch(logIn({userEmail: data.name, adminRights: data.adminRights}));
                localStorage.setItem('userEmail', data.name);
                localStorage.setItem('token', data.token);
                localStorage.setItem('adminRights', data.adminRights);
                this.errorMessage = '';
                this.successMessage = `Welcome ${this.RF.get('email').value}!`;
            },
            (error: any) => { this.errorMessage = error.error.name; }
        );
    }

}

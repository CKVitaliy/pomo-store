import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SubmitService} from '../submit.service';
import {ConfirmPasswordValidator} from '../customValidatorPassword';
import {logIn} from '../Store/Actions/user.actions';
import {Store} from '@ngrx/store';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
    RF: FormGroup;
    successMessage;
    errorMessage;

    constructor(
        private fb: FormBuilder,
        private submitService: SubmitService,
        private store: Store<{user: any}>) { }

    ngOnInit() {
        this.RF = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(3)]],
            confirmPassword: ['', [Validators.required]]
        }, {validator: ConfirmPasswordValidator.MatchPassword});
    }

    register() {
        const newUser = {
            email: this.RF.get('email').value,
            password: this.RF.get('password').value
        };
        this.submitService.postData('http://localhost:3000/registration', newUser).subscribe(
            (data: any) => {
                console.log(data);
                this.store.dispatch(logIn({userEmail: data.name, adminRights: data.adminRights}));
                localStorage.setItem('userEmail', data.name);
                localStorage.setItem('token', data.token);
                localStorage.setItem('adminRights', data.adminRights);
                this.successMessage = `Thank you for the registration ${data.name}`;
            },
            (error: any) => {
                this.errorMessage = error.error.name;
            }
        );
    }

    clear() {
        this.errorMessage = '';
    }
}

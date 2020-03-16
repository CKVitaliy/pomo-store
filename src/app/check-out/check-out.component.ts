import {Component, OnInit} from '@angular/core';
import {Product} from '../product';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SubmitService} from '../submit.service';
import {InteractionService} from '../interaction.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
    selector: 'app-check-out',
    templateUrl: './check-out.component.html',
    styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
    chosenProducts: Product[];
    quantity = 0;
    sum = 0;
    RF: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private submitService: SubmitService,
                private _interactionService: InteractionService,
                private router: Router) {
    }

    ngOnInit() {
        this.submitService.getData('http://localhost:3000/checkout').subscribe(
            (data: any) => {
                const userEmail = localStorage.getItem('userEmail');
                this.RF = this.formBuilder.group({
                    name: ['Egor', [Validators.required]],
                    email: [userEmail, [Validators.required]],
                    phone: ['911', [Validators.required]],
                    country: ['Ukraine', [Validators.required]],
                    region: ['Cherkasy region', [Validators.required]],
                    city: ['Cherkasy', [Validators.required]],
                    np: ['14', [Validators.required]]
                });
                if (localStorage.getItem('chosenProducts') !== null) {
                    this.chosenProducts = JSON.parse(localStorage.getItem('chosenProducts'));
                    let quantity = 0;
                    let sum = 0;
                    this.chosenProducts.forEach(function (el) {
                        quantity = quantity + el.quantity;
                        sum = sum + (el.quantity * el.price);
                    });
                    this.quantity = quantity;
                    this.sum = sum;
                }
            },
            error => {
                if (error instanceof HttpErrorResponse) {
                    if (error.status === 401) {
                        console.log(error.error);
                        this.router.navigate(['/login']);
                    }
                }
            }
        );
    }

    onSubmit() {
        const date = new Date();
        const today = date.getDate();
        let month: any = date.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }
        const year = date.getFullYear();
        let hour: any = date.getHours();
        if (hour < 10) {
            hour = '0' + hour;
        }
        const minute = date.getMinutes();
        const time: string = today + '.' + month + '.' + year + ', ' + hour + ':' + minute;
        this.submitService.postData('http://localhost:3000/admin/submit', {
            userInfo: this.RF.value,
            chosenProducts: this.chosenProducts,
            time: time
        })
            .subscribe((data: any) => console.log('Server received our data and return ' + data.name));
        localStorage.removeItem('chosenProducts');
        const quantity = 0;
        this._interactionService.changeMessage(quantity);
    }
}

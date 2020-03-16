import {Component, OnInit} from '@angular/core';
import {InteractionService} from '../interaction.service';
import {SubmitService} from '../submit.service';
import {Store} from '@ngrx/store';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
    allCategoryArray;
    quantity = 0;
    user$;
    firstLetter = 'P';

    constructor(
        private _interactionService: InteractionService,
        private submitService: SubmitService,
        private store: Store<{ user: any }>
    ) {
        this.store.select('user').subscribe((data: any) => {
            this.user$ = data;
            this.firstLetter = data.userEmail.slice(0, 1).toUpperCase();
        });
    }

    ngOnInit() {
        this.submitService.getData('http://localhost:3000/getAllCategories')
            .subscribe((data: any) => this.allCategoryArray = data.allCategoryArray);

        if (localStorage.getItem('adminRights') !== null) {
            this.user$.adminRights = localStorage.getItem('adminRights');
        }

        if (localStorage.getItem('userEmail') !== null) {
            this.user$.userEmail = localStorage.getItem('userEmail');
            this.firstLetter = localStorage.getItem('userEmail').slice(0, 1).toUpperCase();
        }

        if (localStorage.getItem('chosenProducts') !== null) {
            let quantity = 0;
            JSON.parse(localStorage.getItem('chosenProducts')).forEach(function (el) {
                quantity = quantity + el.quantity;
            });
            this.quantity = quantity;
        }
        this._interactionService.currentMessage.subscribe(data => this.quantity = Number(data));
    }
}

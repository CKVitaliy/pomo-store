import {Component, OnInit} from '@angular/core';
import {SubmitService} from '../submit.service';

@Component({
    selector: 'app-all-categories',
    templateUrl: './all-categories.component.html',
    styleUrls: ['./all-categories.component.css']
})
export class AllCategoriesComponent implements OnInit {
    allCategoryArray: any;
    errorMessage;

    constructor(private submitService: SubmitService) {
    }

    ngOnInit() {
        this.submitService.getData('http://localhost:3000/getAllCategories')
            .subscribe(
                (data: any) => {
                    this.allCategoryArray = data.allCategoryArray;
                },
                error => {
                    this.errorMessage = `Error status: ${error.status}. ${error.error.name}`;
                }
            );
    }
}


import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SubmitService} from '../submit.service';

@Component({
    selector: 'app-create-category',
    templateUrl: './create-category.component.html',
    styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
    createdCategoriesArray;
    RF: FormGroup;
    ourFile: any;
    successMessage;
    errorMessage;

    constructor(private fb: FormBuilder, private submitService: SubmitService) {
    }

    ngOnInit() {
        this.submitService.getData('http://localhost:3000/getAllCategories')
            .subscribe((data: any) => this.createdCategoriesArray = data.allCategoryArray);

        this.RF = this.fb.group({
            name: ['', [Validators.required]],
            image: ['', [Validators.required]]
        });
    }

    onChangeImage(event) {
        this.ourFile = event.target.files[0];
    }

    createCategory() {
        const fd = new FormData();
        fd.append('name', this.RF.get('name').value);
        fd.append('image', this.ourFile);
        this.submitService.postData('http://localhost:3000/admin/createCategory', fd).subscribe(
            (data: any) => {
                this.successMessage = data.name;
                this.RF.setValue({
                    name: '',
                    image: ''
                });
                this.RF.get('name').markAsUntouched();
                this.RF.get('image').markAsUntouched();
                this.submitService.getData('http://localhost:3000/getAllCategories')
                    .subscribe((data1: any) => this.createdCategoriesArray = data1.allCategoryArray);
            },
            error => {
                this.errorMessage = `Error status: ${error.status}. ${error.error.name}`;
            });
    }

    deleteCategory(a) {
        const url = `http://localhost:3000/admin/deleteCategory/${a}`;
        this.submitService.deleteData(url).subscribe(
            () => {
                this.clear();
                this.submitService.getData('http://localhost:3000/getAllCategories')
                    .subscribe((data2: any) => this.createdCategoriesArray = data2.allCategoryArray);
            },
            error => {
                this.errorMessage = `Error status: ${error.status}. ${error.error.name}`;
            }
        );
    }

    clear() {
        this.errorMessage = '';
        this.successMessage = '';
    }

}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {SubmitService} from '../submit.service';

@Component({
    selector: 'app-create-product',
    templateUrl: './create-product.component.html',
    styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
    allCategoryArray;
    ourFiles: any;
    successMessage;
    errorMessage;
    RF: FormGroup;

    constructor(private fb: FormBuilder, private submitService: SubmitService) {
    }

    ngOnInit() {
        this.submitService.getData('http://localhost:3000/getAllCategories')
            .subscribe(
                (data: any) => {
                    this.allCategoryArray = data.allCategoryArray;
                    this.RF = this.fb.group({
                        name: ['', [Validators.required]],
                        price: ['', [Validators.required, Validators.min(1)]],
                        image: ['', [Validators.required]],
                        group: [this.allCategoryArray[0].name]
                    });
                });
    }

    onChangeImage(event) {
        this.ourFiles = event.target.files;
    }

    createProduct() {
        const fd = new FormData();
        fd.append('name', this.RF.get('name').value);
        fd.append('price', this.RF.get('price').value);
        for (var i = 0; i < this.ourFiles.length; i++) {
            fd.append('image[]', this.ourFiles[i]);
        }
        fd.append('group', this.RF.get('group').value);
        this.submitService.postData('http://localhost:3000/admin/createProduct', fd)
            .subscribe(
                (date: any) => {
                    this.successMessage = date.name;
                    this.RF.setValue({
                        name: '',
                        price: null,
                        image: '',
                        group: this.allCategoryArray[0].name
                    });
                    this.RF.get('name').markAsUntouched();
                    this.RF.get('price').markAsUntouched();
                    this.RF.get('image').markAsUntouched();
                },
                (error: any) => {
                    this.errorMessage = `Error status: ${error.status}. ${error.error.name}`;
                }
            );
    }

    clear() {
        this.successMessage = '';
        this.errorMessage = '';
    }
}

import {Component, OnInit} from '@angular/core';
import {SubmitService} from '../submit.service';

@Component({
    selector: 'app-edit-product',
    templateUrl: './edit-product.component.html',
    styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
    createdProductsArray;
    errorMessage;

    constructor(private submitService: SubmitService) {
    }

    ngOnInit() {
        this.submitService.getData('http://localhost:3000/admin/editProduct').subscribe((data: any) => this.createdProductsArray = data);
    }

    deleteProduct(a) {
        const ind = this.createdProductsArray.findIndex(function (el) {
            return el._id === a;
        });
        this.createdProductsArray.splice(ind, 1);
        const url = `${'http://localhost:3000/admin/editProduct'}/${a}`;
        this.submitService.deleteData(url).subscribe(
            () => {
            },
            error => {
                this.errorMessage = error;
            }
        );
    }

}






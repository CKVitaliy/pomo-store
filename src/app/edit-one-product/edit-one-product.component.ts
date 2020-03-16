import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SubmitService} from '../submit.service';

@Component({
    selector: 'app-edit-one-product',
    templateUrl: './edit-one-product.component.html',
    styleUrls: ['./edit-one-product.component.css']
})
export class EditOneProductComponent implements OnInit {
    allCategoryArray;
    name: string;
    price: number;
    group: string;
    id: any;
    successMessage;
    errorMessage;

    constructor(private route: ActivatedRoute, private submitService: SubmitService) {
    }

    ngOnInit() {
        this.submitService.getData('http://localhost:3000/getAllCategories')
            .subscribe(
                (data: any) => {
                    this.allCategoryArray = data.allCategoryArray;
                    const id = this.route.snapshot.paramMap.get('id');
                    this.submitService.getData('http://localhost:3000/admin/editProduct').subscribe(
                        (data1: any) => {
                            const prod = data1.find(function (el) {
                                return el._id === id;
                            });
                            this.name = prod.name;
                            this.price = prod.price;
                            this.group = prod.group;
                            this.id = prod._id;
                        }
                    );
                }
            );
    }

    saveChanges() {
        const prod = {
            name: this.name,
            price: this.price,
            group: this.group,
            _id: this.id
        };
        this.submitService.postData('http://localhost:3000/admin/editProduct', prod).subscribe(
            (data: any) => {
                this.successMessage = data.name;
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

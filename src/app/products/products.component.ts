import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SubmitService} from '../submit.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    productsArray: any;
    errorMessage;

    constructor(private route: ActivatedRoute, private submitService: SubmitService) {
        this.route.params.subscribe(
            (params: any) => {
                const categoryName = params.id;
                const url = 'http://localhost:3000/getCategoryArray?name=' + categoryName;
                this.submitService.getData(url).subscribe(
                    (data: any) => {
                        this.productsArray = data.createdProductsArray;
                    },
                    (error: any) => {
                        this.errorMessage = `Error status: ${error.status}. ${error.error.name}`;
                    }
                );
            });
    }

    ngOnInit() {
    }

}

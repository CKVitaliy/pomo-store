import {Component, OnInit} from '@angular/core';
import {InteractionService} from '../interaction.service';
import {ActivatedRoute} from '@angular/router';
import {SubmitService} from '../submit.service';

@Component({
    selector: 'app-single-product',
    templateUrl: './single-product.component.html',
    styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
    chosenProducts = [];
    singleProduct: any;
    errorMessage;
    successMessage: string;

    constructor(private route: ActivatedRoute, private submitService: SubmitService, private _interactionService: InteractionService) {
    }

    ngOnInit() {
        if (localStorage.getItem('chosenProducts') !== null) {
            this.chosenProducts = JSON.parse(localStorage.getItem('chosenProducts'));
        }
        const singleProductId = this.route.snapshot.paramMap.get('id');
        const url = 'http://localhost:3000/getSingleProduct?name=' + singleProductId;
        this.submitService.getData(url).subscribe(
            (data: any) => {
                this.singleProduct = data.singleProduct;
            },
            error => {
                this.errorMessage = error.error.name;
            }
        );
    }

    addProductToBasket(a) {
        const newProduct = {
            _id: this.singleProduct._id,
            name: this.singleProduct.name,
            price: this.singleProduct.price,
            quantity: this.singleProduct.quantity,
            group: this.singleProduct.group,
            size: a,
            image: this.singleProduct.image
        };
        this.chosenProducts.push(newProduct);
        localStorage.setItem('chosenProducts', JSON.stringify(this.chosenProducts));
        this.newMessage();
        this.successMessage = `You added a product ${this.singleProduct.name} to the basket`;
        const that = this;
        setTimeout(function () {
            that.successMessage = '';
        }, 5000);
    }

    newMessage() {
        let quantity = 0;
        this.chosenProducts.forEach(function (el) {
            quantity = quantity + el.quantity;
        });
        this._interactionService.changeMessage(quantity);
    }

}

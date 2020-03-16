import { Component, OnInit } from '@angular/core';
import {Product} from '../product';
import {InteractionService} from '../interaction.service';
import {Router} from '@angular/router';
import {SubmitService} from '../submit.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  basketArray: Product[] = [];
  sum = 0;
  quantity = 0;


  constructor(private _interactionService: InteractionService, private router: Router, private submitServise: SubmitService) {}
  ngOnInit() {
      if (localStorage.getItem('chosenProducts') !== null) {
          this.basketArray = JSON.parse(localStorage.getItem('chosenProducts'));
          this.summ();
      }
  }

  cleanShoppingCart() {
      this.basketArray = [];
      localStorage.removeItem('chosenProducts');
      this.sum = 0;
      this.quantity = 0;
      this.newMessage();
  }

  summ () {
      let sum = 0;
      let quantity = 0;
      this.basketArray.forEach(function (el) {
          sum = sum + (el.price * el.quantity);
          quantity = quantity + el.quantity;
      });
      this.sum = sum;
      this.quantity = quantity;
  }

  minusQuantity(a) {
      if (a.quantity !== 0) {
      a.quantity--;
      this.summ();
      localStorage.setItem('chosenProducts', JSON.stringify(this.basketArray));
      this.newMessage();
      }
  }
  plusQuantity(a) {
      a.quantity++;
      this.summ();
      localStorage.setItem('chosenProducts', JSON.stringify(this.basketArray));
      this.newMessage();
  }

  newMessage () {
      this._interactionService.changeMessage(this.quantity);
  }


/*  checkOut() {
      const that = this;
      this.submitServise.receiveData('http://localhost:3000/checkout').subscribe(
          (data: any) => that.router.navigate(['/checkout']),
          err => console.log(`AAAAAA ${err}`)
      );
  }*/
}

import {Component, OnInit} from '@angular/core';
import {SubmitService} from '../submit.service';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
    ordersArray;

    constructor(private submitService: SubmitService) {
    }

    ngOnInit() {
        this.submitService.getData('http://localhost:3000/admin/submit').subscribe((data: any) => {
            this.ordersArray = data;
        });
    }

    deleteOrder(a) {
        const ind = this.ordersArray.findIndex(function (el) {
            return el._id === a;
        });
        this.ordersArray.splice(ind, 1);
        const url = `http://localhost:3000/admin/submit/${a}`;
        this.submitService.deleteData(url).subscribe();
    }
}

import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  private messageSourse = new Subject();
  currentMessage = this.messageSourse.asObservable();

  changeMessage(message) {
    this.messageSourse.next(message);
  }

  constructor() { }
}

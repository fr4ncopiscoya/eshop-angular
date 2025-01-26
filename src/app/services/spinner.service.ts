import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  constructor() { }

  showSpinner() {
    this.isLoadingSubject.next(true);
  }

  hideSpinner() {
    this.isLoadingSubject.next(false);
  }
}

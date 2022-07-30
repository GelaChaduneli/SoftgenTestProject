import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  private isTimerStarted = false;
  public dateNow = new Date();
  public dDay = new Date();


  public timeDifference: any;

  constructor() { }

  private getTimeDifference() {
    this.timeDifference = this.dDay.getTime() - new Date().getTime();
  }

  startTimer() {
    if (!this.isTimerStarted) {

      this.dDay.setMinutes(
        this.dDay.getMinutes() + +environment.cacheTimeInMinutes
      );
      this.getTimeDifference();
      this.isTimerStarted = true;
    }
  }

  resetTimer() {
    this.isTimerStarted = false;
    this.getTimeDifference();
  }

  getRemainingTime(): number {
    this.getTimeDifference();
    return this.timeDifference;
  }
}

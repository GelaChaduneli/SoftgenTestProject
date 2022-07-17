import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { PrimeNGConfig } from 'primeng/api';
import { LoadingService } from './core/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SoftgenTestProject';
  loading: boolean = false;

  constructor(private primengConfig: PrimeNGConfig, private _loading: LoadingService) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.listenToLoading();
  }


  /**
   * Listen to the loadingSub property in the LoadingService class. This drives the
   * display of the loading spinner.
   */
  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }
}

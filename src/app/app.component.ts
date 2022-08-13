import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { PrimeNGConfig } from 'primeng/api';
import { LoadingService } from './core/services/loading.service';
import { Loading } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SoftgenTestProject';

  public get isLoadingForGet(): boolean {
    return Loading.isLoadingForGet
  }

  public get isLoadingForRest(): boolean {
    return Loading.isLoadingForRest
  }


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
    this._loading.loadingSubForRest
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        Loading.isLoadingForRest = loading;
      });
    this._loading.loadingSubForGet
      .pipe(delay(0))
      .subscribe((loading) => {
        Loading.isLoadingForGet = loading;
      });
  }
}

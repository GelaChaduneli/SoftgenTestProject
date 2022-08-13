import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpRequestInterceptor } from './core/interceptors/HttpRequestInterceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

//SweatAlert2
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

// PrimeNG
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MainComponent } from './main/main.component';
import { CacheInterceptor } from './core/interceptors/cache.interceptor';
import { DialogModule } from 'primeng/dialog';
import { GlobalErrorHandler } from './core/services/errorHandling/global-error-handling.service';
import { ServerErrorInterceptor } from './core/interceptors/server-error.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ProgressSpinnerModule,
    DialogModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

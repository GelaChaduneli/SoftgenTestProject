import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { LoggingService } from '../logging.service';
import { ErrorService } from './error.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    // Error handling is important and needs to be loaded first.
    // Because of this we should manually inject the services with Injector.
    constructor(private injector: Injector) { }

    handleError(error: Error | HttpErrorResponse) {

        const errorService = this.injector.get(ErrorService);
        const logger = this.injector.get(LoggingService);

        let message;
        let stackTrace;

        if (error instanceof HttpErrorResponse) {
            // Server Error
            let errorModel = errorService.getServerMessage(error);
            message = errorModel.errorText
            stackTrace = errorService.getServerStack(error);
            Swal.fire({
                icon: 'error',
                title: errorModel.errorText,
                text: errorModel.errorDescription
            })
        } else {
            // Client Error
            message = errorService.getClientMessage(error);
            stackTrace = errorService.getClientStack(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: message
            })
        }

        // Always log errors
        logger.logError(message, stackTrace);

    }
}
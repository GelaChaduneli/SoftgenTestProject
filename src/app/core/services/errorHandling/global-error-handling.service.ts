import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LoggingService } from '../logging.service';
import { ErrorService } from './error.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    // Error handling is important and needs to be loaded first.
    // Because of this we should manually inject the services with Injector.
    constructor(private injector: Injector) { }

    handleError(error: Error | HttpErrorResponse) {

        const errorService = this.injector.get(ErrorService);
        const logger = this.injector.get(LoggingService);
        const notifier = this.injector.get(MessageService);

        let message;
        let stackTrace;

        if (error instanceof HttpErrorResponse) {
            // Server Error
            let errorModel = errorService.getServerMessage(error);
            message = errorModel.errorText
            stackTrace = errorService.getServerStack(error);
            // notifier.add({ severity: 'error', summary: errorModel.errorText, detail: errorModel.errorDescription, sticky: true });
            alert(errorModel.errorDescription)
        } else {
            // Client Error
            message = errorService.getClientMessage(error);
            stackTrace = errorService.getClientStack(error);
            // notifier.add({ severity: 'error', summary: 'Error', detail: message, sticky: true });
            alert(message)
        }

        // Always log errors
        logger.logError(message, stackTrace);

    }
}
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorModel } from '../../interfaces/error-model.interface';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() {

  }

  getClientMessage(error: Error): string {
    if (!navigator.onLine) {
      return 'No Internet Connection';
    }
    return error.message ? error.message : error.toString();
  }

  getClientStack(error: Error): string {
    return error.stack;
  }

  getServerMessage(error: HttpErrorResponse): ErrorModel {
    return this.formatHttpError(error);
  }

  getServerStack(error: HttpErrorResponse): string {
    // handle stack trace
    return 'stack';
  }

  formatHttpError(error: HttpErrorResponse): ErrorModel {

    let errorModel: ErrorModel = {
      errorText: error.message,
      errorDescription: ''
    }


    switch (error.status) {
      case 400: errorModel.errorDescription = 'The request cannot be fulfilled due to bad syntax'
        break;
      case 401: errorModel.errorDescription = 'The request was a legal request, but the server is refusing to respond to it. For use when authentication is possible but has failed or not yet been provided'
        break;
      case 402: errorModel.errorDescription = 'Reserved for future use'
        break;
      case 403: errorModel.errorDescription = 'The request was a legal request, but the server is refusing to respond to it'
        break;
      case 404: errorModel.errorDescription = 'The requested page could not be found but may be available again in the future'
        break;
      case 405: errorModel.errorDescription = 'A request was made of a page using a request method not supported by that page'
        break;
      case 406: errorModel.errorDescription = 'The server can only generate a response that is not accepted by the client'
        break;
      case 407: errorModel.errorDescription = 'The client must first authenticate itself with the proxy'
        break;
      case 408: errorModel.errorDescription = 'The server timed out waiting for the request'
        break;
      case 409: errorModel.errorDescription = 'The request could not be completed because of a conflict in the request'
        break;
      case 410: errorModel.errorDescription = 'The requested page is no longer available'
        break;
      case 411: errorModel.errorDescription = 'The "Content-Length" is not defined. The server will not accept the request without it'
        break;
      case 412: errorModel.errorDescription = 'The precondition given in the request evaluated to false by the server'
        break;
      case 413: errorModel.errorDescription = 'The server will not accept the request, because the request entity is too large'
        break;
      case 414: errorModel.errorDescription = 'The server will not accept the request, because the URI is too long. Occurs when you convert a POST request to a GET request with a long query information'
        break;
      case 415: errorModel.errorDescription = 'The server will not accept the request, because the media type is not supported'
        break;
      case 416: errorModel.errorDescription = 'The client has asked for a portion of the file, but the server cannot supply that portion'
        break;
      case 417: errorModel.errorDescription = 'The server cannot meet the requirements of the Expect request-header field'
        break;
      case 500: errorModel.errorDescription = 'A generic error message, given when no more specific message is suitable'
        break;
      case 501: errorModel.errorDescription = 'The server either does not recognize the request method, or it lacks the ability to fulfill the request'
        break;
      case 502: errorModel.errorDescription = 'The server was acting as a gateway or proxy and received an invalid response from the upstream server'
        break;
      case 503: errorModel.errorDescription = 'The server is currently unavailable (overloaded or down)'
        break;
      case 504: errorModel.errorDescription = 'The server was acting as a gateway or proxy and did not receive a timely response from the upstream server'
        break;
      case 505: errorModel.errorDescription = 'The server does not support the HTTP protocol version used in the request'
        break;
      case 511: errorModel.errorDescription = 'The client needs to authenticate to gain network access'
        break;


      default:
        errorModel.errorText = 'Unknown Error';
        errorModel.errorDescription = 'Unexcpected error occured!'
        break;
    }

    return errorModel;
  }
}
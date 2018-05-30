import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {finalize, tap} from 'rxjs/operators';
import {MessageService} from '../message.service';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  constructor(private messageService: MessageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const started = Date.now();
    let ok: string;

    return next.handle(req).pipe(
      tap(
        // Succeeds when there is a response; ignore other events
        event => ok = event instanceof HttpResponse ? 'succeeded' : '',
        // Operation failed; error is an HttpErrorResponse
        error => ok = 'failed'
      ),
      // Log when response observable either completes or errors
      finalize(() => {
        const elapsed = Date.now() - started;
        const msg = `${req.method} "${req.urlWithParams}"
             ${ok} in ${elapsed} ms.`;
        this.messageService.add(msg);
      })
    );
  }
}

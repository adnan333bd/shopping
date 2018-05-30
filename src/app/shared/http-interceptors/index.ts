/* "Barrel" of Http Interceptors */
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {AuthInterceptor} from './auth-interceptor';
import {LoggingInterceptor} from './logging-interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptors = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true},
];

import { ProgressBarService } from '@/app/global/services/common/progress-bar.service';
import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

export const progressBarInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const progressBarService = inject(ProgressBarService);
  progressBarService.requestStarted();

  return next(req).pipe(
    finalize(() => progressBarService.requestEnded())
  );
};
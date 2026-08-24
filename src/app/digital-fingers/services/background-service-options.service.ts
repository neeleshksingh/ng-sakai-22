import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { BackgroundServiceOptions } from 'src/app/shared/models/digital-fingers/background-service-options';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackgroundServiceOptionsService extends GenericService<BackgroundServiceOptions, BackgroundServiceOptions> {
  private readonly backgroundServiceOptionsSubject = new BehaviorSubject<BackgroundServiceOptions[]>([]);
  readonly backgroundServiceOptions$ = this.backgroundServiceOptionsSubject.asObservable();

  constructor(http: HttpClient, messageService: MessageService) {
    super(http, messageService, 'BackgroundServiceOptions', environment.apiDigitalFingersUrl);
  }

  loadAllToObservable(): Observable<BackgroundServiceOptions[]> {
    return this.getAll().pipe(
      tap((data) => this.backgroundServiceOptionsSubject.next(data || []))
    );
  }
}

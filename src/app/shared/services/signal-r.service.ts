import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as signalR from '@microsoft/signalr';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { NotificationMessage } from '../models/commons/notificationMessage';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  public data!: NotificationMessage;

  public bradcastedData!: NotificationMessage;
  private hubConnection?: signalR.HubConnection;

  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router) { }
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.apiSignalRUrl + "/signalr")
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  public addTransferNotificationMessageListener = () => {
    console.log('addTransferNotificationMessageListener called');

    this.hubConnection?.on('TransferNotificationMessageData', (data) => {

      console.log('TransferNotificationMessageData received');

      this.data = data;
      console.log(data);
      if (data) {

        console.log('NotificationMessageData received:', data);

        this.messageService.add({
          severity: data.messageType?.toLowerCase() || 'info',
          summary: data.title,
          detail: data.description
        });

        this.confirmationService.confirm({
          message: data.description,
          header: 'Alert: ' + data.title,
          icon: 'pi pi-exclamation-triangle',

          accept: () => {

            if (data.purpose === 'RefreshBrowser') {
              window.location.reload();

            } else if (data.purpose === 'LogOut') {

              localStorage.clear();
              this.router.navigateByUrl('/');

            } else if (data.purpose === 'ApplicationMaintenance') {

              // No action required.
              // User is simply informed.

            } else if (data.purpose === 'ForcePasswordChange') {

              this.router.navigate(['/change-password']);

            } else if (data.purpose === 'SessionExpired') {

              localStorage.clear();
              this.router.navigate(['/login']);

            } else if (data.purpose === 'NewVersionAvailable') {

              window.location.reload();

            } else if (data.purpose === 'ServerRestart') {

              window.location.reload();

            } else if (data.purpose === 'DatabaseMaintenance') {

              // Optional:
              // Disable UI or redirect to maintenance page.
              this.router.navigate(['/maintenance']);

            } else if (data.purpose === 'SecurityAlert') {

              localStorage.clear();
              this.router.navigate(['/login']);

            } else if (data.purpose === 'Announcement') {

              // Only display message.
              // No action.

            } else if (data.purpose === 'FeatureRelease') {

              window.location.reload();

            } else if (data.purpose === 'HolidayNotice') {

              // Information only.

            } else if (data.purpose === 'EmergencyMaintenance') {

              this.router.navigate(['/maintenance']);

            } else if (data.purpose === 'LicenseExpired') {

              localStorage.clear();
              this.router.navigate(['/license']);

            } else if (data.purpose === 'CustomMessage') {

              // No action.

            }
          },
          reject: () => {
            // Optional: Handle reject action
          }
        });
      }
    });

    console.log('addTransferNotificationMessageListener completed');
  }

  public broadcastNotificationMessage = () => {
    var data = {
      id: 1,
      name: "test",
      title: "test title",
      description: "deme test message"
    }

    this.hubConnection?.invoke('BroadcastNotificationMessageData', data)
      .catch(err => console.error(err));
  }

  public addBroadcastNotificationMessageListener = () => {

    console.log('addBroadcastNotificationMessageListener called');
    this.hubConnection?.on('BroadcastNotificationMessageData', (data) => {
      console.log('BroadcastNotificationMessageData received : ', data);
      this.bradcastedData = data;
    });

    console.log('addBroadcastNotificationMessageListener completed');
  }
}


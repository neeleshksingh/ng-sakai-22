import { environment } from 'src/environments/environment';

export class ServiceEndpointUrls {

  public static ServiceBaseUrl: string = environment.apiExaminationsUrl;

  static Account = class {
    // public static ChallengeUser: string = ServiceEndpointUrls.ServiceBaseUrl + '/Account/ChallengeUser';
    // public static ChallengePassword: string = ServiceEndpointUrls.ServiceBaseUrl + '/Account/ChallengePassword';
  }
}

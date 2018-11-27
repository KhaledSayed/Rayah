/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { UserVM } from '../models/user-vm';
import { RegisterParams } from '../models/register-params';
import { LoginResponseVM } from '../models/login-response-vm';
import { LoginVM } from '../models/login-vm';
@Injectable({
  providedIn: 'root',
})
class UserService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param RegisterParams undefined
   */
  UserRegisterResponse(RegisterParams: RegisterParams): Observable<StrictHttpResponse<UserVM>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = RegisterParams;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/users/register`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<UserVM>;
      })
    );
  }
  /**
   * @param RegisterParams undefined
   */
  UserRegister(RegisterParams: RegisterParams): Observable<UserVM> {
    return this.UserRegisterResponse(RegisterParams).pipe(
      __map(_r => _r.body as UserVM)
    );
  }

  /**
   * @param LoginVM undefined
   */
  UserLoginResponse(LoginVM: LoginVM): Observable<StrictHttpResponse<LoginResponseVM>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = LoginVM;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/users/login`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<LoginResponseVM>;
      })
    );
  }
  /**
   * @param LoginVM undefined
   */
  UserLogin(LoginVM: LoginVM): Observable<LoginResponseVM> {
    return this.UserLoginResponse(LoginVM).pipe(
      __map(_r => _r.body as LoginResponseVM)
    );
  }
}

module UserService {
}

export { UserService }

/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { TodoParams } from '../models/todo-params';
import { TodoVm } from '../models/todo-vm';
@Injectable({
  providedIn: 'root',
})
class ApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }
  getRootHelloResponse(): Observable<StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/root/hello`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<null>;
      })
    );
  }  getRootHello(): Observable<null> {
    return this.getRootHelloResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param TodoParams undefined
   */
  postTodosResponse(TodoParams: TodoParams): Observable<StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = TodoParams;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/todos`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param TodoParams undefined
   */
  postTodos(TodoParams: TodoParams): Observable<null> {
    return this.postTodosResponse(TodoParams).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ApiService.GetTodosParams` containing the following parameters:
   *
   * - `level`:
   *
   * - `isCompleted`:
   */
  getTodosResponse(params: ApiService.GetTodosParams): Observable<StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.level != null) __params = __params.set('level', params.level.toString());
    if (params.isCompleted != null) __params = __params.set('isCompleted', params.isCompleted.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/todos`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `ApiService.GetTodosParams` containing the following parameters:
   *
   * - `level`:
   *
   * - `isCompleted`:
   */
  getTodos(params: ApiService.GetTodosParams): Observable<null> {
    return this.getTodosResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param TodoParams undefined
   */
  TodoUpdateResponse(TodoParams: TodoParams): Observable<StrictHttpResponse<TodoVm>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = TodoParams;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/todos`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<TodoVm>;
      })
    );
  }
  /**
   * @param TodoParams undefined
   */
  TodoUpdate(TodoParams: TodoParams): Observable<TodoVm> {
    return this.TodoUpdateResponse(TodoParams).pipe(
      __map(_r => _r.body as TodoVm)
    );
  }

  /**
   * @param id undefined
   */
  TodoDeleteResponse(id: any): Observable<StrictHttpResponse<TodoVm>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/todos/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<TodoVm>;
      })
    );
  }
  /**
   * @param id undefined
   */
  TodoDelete(id: any): Observable<TodoVm> {
    return this.TodoDeleteResponse(id).pipe(
      __map(_r => _r.body as TodoVm)
    );
  }
}

module ApiService {

  /**
   * Parameters for getTodos
   */
  export interface GetTodosParams {
    level: string;
    isCompleted: boolean;
  }
}

export { ApiService }

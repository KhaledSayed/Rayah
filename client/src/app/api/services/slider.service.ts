/* tslint:disable */
import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpHeaders
} from "@angular/common/http";
import { BaseService } from "../base-service";
import { ApiConfiguration } from "../api-configuration";
import { StrictHttpResponse } from "../strict-http-response";
import { Observable } from "rxjs";
import { map as __map, filter as __filter } from "rxjs/operators";

import { SliderVm } from "../models/slider-vm";
import { SliderParams } from "../models/slider-params";
@Injectable({
  providedIn: "root"
})
class SliderService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * @param params The `SliderService.SliderGetParams` containing the following parameters:
   *
   * - `perPage`:
   *
   * - `page`:
   */
  SliderGetResponse(
    params: SliderService.SliderGetParams
  ): Observable<StrictHttpResponse<Array<SliderVm>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.perPage != null)
      __params = __params.set("perPage", params.perPage.toString());
    if (params.page != null)
      __params = __params.set("page", params.page.toString());
    let req = new HttpRequest<any>("GET", this.rootUrl + `/sliders`, __body, {
      headers: __headers,
      params: __params,
      responseType: "json"
    });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map(_r => {
        return _r as StrictHttpResponse<Array<SliderVm>>;
      })
    );
  }
  /**
   * @param params The `SliderService.SliderGetParams` containing the following parameters:
   *
   * - `perPage`:
   *
   * - `page`:
   */
  SliderGet(
    params: SliderService.SliderGetParams
  ): Observable<Array<SliderVm>> {
    return this.SliderGetResponse(params).pipe(
      __map(_r => _r.body as Array<SliderVm>)
    );
  }

  /**
   * @param SliderParams undefined
   */
  SliderCreateResponse(
    SliderParams: SliderParams
  ): Observable<StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = SliderParams;
    let req = new HttpRequest<any>("POST", this.rootUrl + `/sliders`, __body, {
      headers: __headers,
      params: __params,
      responseType: "json"
    });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map(_r => {
        return _r as StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param SliderParams undefined
   */
  SliderCreate(SliderParams: SliderParams): Observable<null> {
    return this.SliderCreateResponse(SliderParams).pipe(
      __map(_r => _r.body as null)
    );
  }
  SliderGetoneResponse(id): Observable<StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/sliders/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: "json"
      }
    );

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map(_r => {
        return _r as StrictHttpResponse<null>;
      })
    );
  }
  SliderGetone(id): Observable<null> {
    return this.SliderGetoneResponse(id).pipe(__map(_r => _r.body as null));
  }

  /**
   * @param SliderParams undefined
   */
  SliderPutResponse(
    SliderParams: SliderParams,
    id
  ): Observable<StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = SliderParams;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/sliders/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: "json"
      }
    );

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map(_r => {
        return _r as StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param SliderParams undefined
   */
  SliderPut(SliderParams: SliderParams, id): Observable<null> {
    return this.SliderPutResponse(SliderParams, id).pipe(
      __map(_r => _r.body as null)
    );
  }
  SliderDeleteResponse(id): Observable<StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/sliders/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: "json"
      }
    );

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map(_r => {
        return _r as StrictHttpResponse<null>;
      })
    );
  }
  SliderDelete(id): Observable<null> {
    return this.SliderDeleteResponse(id).pipe(__map(_r => _r.body as null));
  }
}

namespace SliderService {
  /**
   * Parameters for SliderGet
   */
  export interface SliderGetParams {
    perPage: number;
    page: number;
  }
}

export { SliderService };

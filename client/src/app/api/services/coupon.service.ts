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

import { CouponVm } from "../models/coupon-vm";
import { CouponParams } from "../models/coupon-params";
import { CouponPutParams } from "../models/coupon-put-params";
@Injectable({
  providedIn: "root"
})
class CouponService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * @param params The `CouponService.CouponGetParams` containing the following parameters:
   *
   * - `perPage`:
   *
   * - `page`:
   */
  CouponGetResponse(
    params: CouponService.CouponGetParams
  ): Observable<StrictHttpResponse<Array<CouponVm>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.perPage != null)
      __params = __params.set("perPage", params.perPage.toString());
    if (params.page != null)
      __params = __params.set("page", params.page.toString());
    let req = new HttpRequest<any>("GET", this.rootUrl + `/coupons`, __body, {
      headers: __headers,
      params: __params,
      responseType: "json"
    });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map(_r => {
        return _r as StrictHttpResponse<Array<CouponVm>>;
      })
    );
  }
  /**
   * @param params The `CouponService.CouponGetParams` containing the following parameters:
   *
   * - `perPage`:
   *
   * - `page`:
   */
  CouponGet(
    params: CouponService.CouponGetParams
  ): Observable<Array<CouponVm>> {
    return this.CouponGetResponse(params).pipe(
      __map(_r => _r.body as Array<CouponVm>)
    );
  }

  /**
   * @param CouponParams undefined
   */
  CouponPostResponse(
    CouponParams: CouponParams
  ): Observable<StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = CouponParams;
    let req = new HttpRequest<any>("POST", this.rootUrl + `/coupons`, __body, {
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
   * @param CouponParams undefined
   */
  CouponPost(CouponParams: CouponParams): Observable<null> {
    return this.CouponPostResponse(CouponParams).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param CouponPutParams undefined
   */
  CouponPutResponse(
    CouponPutParams: CouponPutParams,
    id
  ): Observable<StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = CouponPutParams;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/coupons/${id}`,
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
   * @param CouponPutParams undefined
   */
  CouponPut(CouponPutParams: CouponPutParams, id): Observable<null> {
    return this.CouponPutResponse(CouponPutParams, id).pipe(
      __map(_r => _r.body as null)
    );
  }
  CouponDeleteResponse(id): Observable<StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/coupons/${id}`,
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
  CouponDelete(id): Observable<null> {
    return this.CouponDeleteResponse(id).pipe(__map(_r => _r.body as null));
  }
  getCouponsIdResponse(id): Observable<StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/coupons/${id}`,
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
  getCouponsId(id): Observable<null> {
    return this.getCouponsIdResponse(id).pipe(__map(_r => _r.body as null));
  }
}

namespace CouponService {
  /**
   * Parameters for CouponGet
   */
  export interface CouponGetParams {
    perPage: number;
    page: number;
  }
}

export { CouponService };

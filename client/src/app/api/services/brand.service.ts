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

import { BrandVm } from "../models/brand-vm";
import { BrandParam } from "../models/brand-param";
import { CouponVm } from "../models/coupon-vm";
@Injectable()
class BrandService extends BaseService {
  __headers = new HttpHeaders();

  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
    this.__headers = this.__headers.append(
      "Authorization",
      `Bearer ${localStorage.getItem("token")}`
    );
  }

  onPutTestMultipart(formData: FormData): Observable<Object> {
    return this.http.put(this.rootUrl + "/brand", formData, {
      observe: "response"
    });
  }

  findOne(id): Observable<BrandVm> | Observable<BrandVm> {
    return this.http.get<BrandVm>(`${this.rootUrl}/brand/${id}`);
  }

  onTestMultipart(formData: FormData): Observable<Object> {
    return this.http.post(this.rootUrl + "/brand", formData, {
      observe: "response"
    });
  }

  /**
   * @param params The `BrandService.BrandCreateParams` containing the following parameters:
   *
   * - `BrandParam`:
   *
   * - `banner`: Banner
   */
  BrandCreateResponse(
    params: BrandService.BrandCreateParams
  ): Observable<StrictHttpResponse<BrandVm>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __headers = __headers.append("Content-Type", "multipart/form-data");
    __headers = __headers.append(
      "Authorization",
      `Bearer ${localStorage.getItem("token")}`
    );
    let __formData = new FormData();
    __body = __formData;
    __body = params.BrandParam;
    if (params.banner !== null && typeof params.banner !== "undefined") {
      __formData.append("banner", params.banner as string | Blob);
    }
    let req = new HttpRequest<any>("POST", this.rootUrl + `/brand`, __body, {
      headers: __headers,
      params: __params,
      responseType: "json"
    });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map(_r => {
        return _r as StrictHttpResponse<BrandVm>;
      })
    );
  }
  /**
   * @param params The `BrandService.BrandCreateParams` containing the following parameters:
   *
   * - `BrandParam`:
   *
   * - `banner`: Banner
   */
  BrandCreate(params: BrandService.BrandCreateParams): Observable<BrandVm> {
    return this.BrandCreateResponse(params).pipe(
      __map(_r => _r.body as BrandVm)
    );
  }
  BrandGetResponse(): Observable<StrictHttpResponse<Array<BrandVm>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    __headers = __headers.append(
      "Authorization",
      `Bearer ${localStorage.getItem("token")}`
    );

    let __body: any = null;
    let req = new HttpRequest<any>("GET", this.rootUrl + `/brand`, __body, {
      headers: this.__headers,
      params: __params,
      responseType: "json"
    });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map(_r => {
        return _r as StrictHttpResponse<Array<BrandVm>>;
      })
    );
  }
  BrandGet(): Observable<Array<BrandVm>> {
    return this.BrandGetResponse().pipe(__map(_r => _r.body as Array<BrandVm>));
  }

  /**
   * @param BrandParam undefined
   */
  BrandUpdateResponse(
    BrandParam: BrandParam
  ): Observable<StrictHttpResponse<BrandVm>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = BrandParam;
    let req = new HttpRequest<any>("PUT", this.rootUrl + `/brand`, __body, {
      headers: this.__headers,
      params: __params,
      responseType: "json"
    });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map(_r => {
        return _r as StrictHttpResponse<BrandVm>;
      })
    );
  }
  /**
   * @param BrandParam undefined
   */
  BrandUpdate(BrandParam: BrandParam): Observable<BrandVm> {
    return this.BrandUpdateResponse(BrandParam).pipe(
      __map(_r => _r.body as BrandVm)
    );
  }

  /**
   * @param id undefined
   */
  BrandDeleteResponse(id: any): Observable<StrictHttpResponse<BrandVm>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/brand/${id}`,
      __body,
      {
        headers: this.__headers,
        params: __params,
        responseType: "json"
      }
    );

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map(_r => {
        return _r as StrictHttpResponse<BrandVm>;
      })
    );
  }
  /**
   * @param id undefined
   */
  BrandDelete(id: any): Observable<BrandVm> {
    return this.BrandDeleteResponse(id).pipe(__map(_r => _r.body as BrandVm));
  }
}

namespace BrandService {
  /**
   * Parameters for BrandCreate
   */
  export interface BrandCreateParams {
    BrandParam: BrandParam;

    /**
     * Banner
     */
    banner?: Blob;
  }
}

export { BrandService };

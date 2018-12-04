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

import { OrderVm } from "../models/order-vm";
import { OrderParam } from "../models/order-param";
@Injectable({
  providedIn: "root"
})
class OrderService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * @param params The `OrderService.OrderGetParams` containing the following parameters:
   *
   * - `status`:
   *
   * - `perPage`:
   *
   * - `page`:
   */
  OrderGetResponse(
    params: OrderService.OrderGetParams
  ): Observable<StrictHttpResponse<Array<OrderVm>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    (params.status || []).forEach(val => {
      if (val != null) __params = __params.append("status", val.toString());
    });
    if (params.perPage != null)
      __params = __params.set("perPage", params.perPage.toString());
    if (params.page != null)
      __params = __params.set("page", params.page.toString());
    let req = new HttpRequest<any>("GET", this.rootUrl + `/orders`, __body, {
      headers: __headers,
      params: __params,
      responseType: "json"
    });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map(_r => {
        return _r as StrictHttpResponse<Array<OrderVm>>;
      })
    );
  }
  /**
   * @param params The `OrderService.OrderGetParams` containing the following parameters:
   *
   * - `status`:
   *
   * - `perPage`:
   *
   * - `page`:
   */
  OrderGet(params: OrderService.OrderGetParams): Observable<Array<OrderVm>> {
    return this.OrderGetResponse(params).pipe(
      __map(_r => _r.body as Array<OrderVm>)
    );
  }

  /**
   * @param OrderParam undefined
   */
  OrderCreateResponse(
    OrderParam: OrderParam
  ): Observable<StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = OrderParam;
    let req = new HttpRequest<any>("POST", this.rootUrl + `/orders`, __body, {
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
   * @param OrderParam undefined
   */
  OrderCreate(OrderParam: OrderParam): Observable<null> {
    return this.OrderCreateResponse(OrderParam).pipe(
      __map(_r => _r.body as null)
    );
  }
  OrderUpdateResponse(id, body): Observable<StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/orders/${id}`,
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

  OrderUpdate(id, order): Observable<null> {
    return this.OrderUpdateResponse(id, order).pipe(
      __map(_r => _r.body as null)
    );
  }
  OrderDeleteResponse(id): Observable<StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/orders/${id}`,
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
  OrderDelete(id): Observable<null> {
    return this.OrderDeleteResponse(id).pipe(__map(_r => _r.body as null));
  }

  findOne(id): Observable<OrderVm> | Observable<OrderVm> {
    return this.http.get<OrderVm>(`${this.rootUrl}/orders/${id}`);
  }
}

namespace OrderService {
  /**
   * Parameters for OrderGet
   */
  export interface OrderGetParams {
    status: Array<any>;
    perPage: number;
    page: number;
  }
}

export { OrderService };

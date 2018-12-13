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

import { CategoryVm } from "../models/category-vm";
import { CategoryParams } from "../models/category-params";
@Injectable()
class CategoryService extends BaseService {
  __headers = new HttpHeaders();

  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);

    this.__headers = this.__headers.append(
      "Authorization",
      `Bearer ${localStorage.getItem("token")}`
    );
  }

  findOne(id): Observable<CategoryVm> | Observable<CategoryVm> {
    return this.http.get<CategoryVm>(`${this.rootUrl}/categories/${id}`, {
      headers: this.__headers
    });
  }

  onTestMultipart(formData: FormData): Observable<Object> {
    return this.http.post(this.rootUrl + "/categories", formData, {
      observe: "response",
      headers: this.__headers
    });
  }

  onPutTestMultipart(formData: FormData): Observable<Object> {
    return this.http.put(this.rootUrl + "/categories", formData, {
      observe: "response",
      headers: this.__headers
    });
  }

  /**
   * @param params The `CategoryService.CategoryGetParams` containing the following parameters:
   *
   * - `perPage`:
   *
   * - `page`:
   */
  CategoryGetResponse(
    params: CategoryService.CategoryGetParams
  ): Observable<StrictHttpResponse<Array<CategoryVm>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.perPage != null)
      __params = __params.set("perPage", params.perPage.toString());
    if (params.page != null)
      __params = __params.set("page", params.page.toString());

    if (params.parent != null)
      __params = __params.set("parent", params.parent.toString());

    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/categories`,
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
        return _r as StrictHttpResponse<Array<CategoryVm>>;
      })
    );
  }
  /**
   * @param params The `CategoryService.CategoryGetParams` containing the following parameters:
   *
   * - `perPage`:
   *
   * - `page`:
   */
  CategoryGet(
    params: CategoryService.CategoryGetParams
  ): Observable<Array<CategoryVm>> {
    return this.CategoryGetResponse(params).pipe(
      __map(_r => _r.body as Array<CategoryVm>)
    );
  }

  /**
   * @param CategoryParams undefined
   */
  CategoryCreateResponse(
    CategoryParams: CategoryParams
  ): Observable<StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = CategoryParams;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/categories`,
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
        return _r as StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param CategoryParams undefined
   */
  CategoryCreate(CategoryParams: CategoryParams): Observable<null> {
    return this.CategoryCreateResponse(CategoryParams).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param CategoryParams undefined
   */
  CategoryPutResponse(
    CategoryParams: CategoryParams
  ): Observable<StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = CategoryParams;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/categories`,
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
        return _r as StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param CategoryParams undefined
   */
  CategoryPut(CategoryParams: CategoryParams): Observable<null> {
    return this.CategoryPutResponse(CategoryParams).pipe(
      __map(_r => _r.body as null)
    );
  }

  CategoryDeleteResponse(id): Observable<StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/categories/${id}`,
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
        return _r as StrictHttpResponse<null>;
      })
    );
  }
  CategoryDelete(id): Observable<null> {
    return this.CategoryDeleteResponse(id).pipe(__map(_r => _r.body as null));
  }
}

namespace CategoryService {
  /**
   * Parameters for CategoryGet
   */
  export interface CategoryGetParams {
    perPage: number;
    page: number;
    parent: string;
  }
}

export { CategoryService };

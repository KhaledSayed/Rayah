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

import { ProductVm } from "../models/product-vm";
import { ProductParams } from "../models/product-params";
import { ProductParamsPut } from "../models/product-params-put";
@Injectable()
class ProductService extends BaseService {
  __headers = new HttpHeaders();

  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
    this.__headers = this.__headers.append(
      "Authorization",
      `Bearer ${localStorage.getItem("token")}`
    );
  }

  findOne(id): Observable<ProductVm> | Observable<ProductVm> {
    return this.http.get<ProductVm>(`${this.rootUrl}/products/${id}`, {
      headers: this.__headers
    });
  }

  onTestMultipart(formData: FormData): Observable<Object> {
    return this.http.post(this.rootUrl + "/categories", formData, {
      observe: "response",
      headers: this.__headers
    });
  }

  onPutTestMultipart(formData: FormData, id): Observable<Object> {
    console.log(this.rootUrl + "/products/" + id + "/thumbnail");
    return this.http.put(
      this.rootUrl + "/products/" + id + "/thumbnail",
      formData,
      {
        observe: "response",
        headers: this.__headers
      }
    );
  }

  onPutTestMultipartGallery(formData: FormData, id): Observable<Object> {
    console.log(this.rootUrl + "/products/" + id + "/gallery");
    return this.http.put(
      this.rootUrl + "/products/" + id + "/gallery",
      formData,
      {
        observe: "response",
        headers: this.__headers
      }
    );
  }

  /**
   * @param params The `ProductService.ProductGetParams` containing the following parameters:
   *
   * - `perPage`:
   *
   * - `page`:
   *
   * - `category`:
   *
   * - `minPrice`:
   *
   * - `maxPrice`:
   *
   * - `featured`:
   */
  ProductGetResponse(
    params: ProductService.ProductGetParams
  ): Observable<StrictHttpResponse<Array<ProductVm>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.perPage != null)
      __params = __params.set("perPage", params.perPage.toString());
    if (params.page != null)
      __params = __params.set("page", params.page.toString());
    (params.category || []).forEach(val => {
      if (val != null) __params = __params.append("category", val.toString());
    });
    if (params.minPrice != null)
      __params = __params.set("minPrice", params.minPrice.toString());
    if (params.maxPrice != null)
      __params = __params.set("maxPrice", params.maxPrice.toString());
    if (params.featured != null)
      __params = __params.set("featured", params.featured.toString());
    let req = new HttpRequest<any>("GET", this.rootUrl + `/products`, __body, {
      headers: this.__headers,
      params: __params,
      responseType: "json"
    });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map(_r => {
        return _r as StrictHttpResponse<Array<ProductVm>>;
      })
    );
  }
  /**
   * @param params The `ProductService.ProductGetParams` containing the following parameters:
   *
   * - `perPage`:
   *
   * - `page`:
   *
   * - `category`:
   *
   * - `minPrice`:
   *
   * - `maxPrice`:
   *
   * - `featured`:
   */
  ProductGet(
    params: ProductService.ProductGetParams
  ): Observable<Array<ProductVm>> {
    return this.ProductGetResponse(params).pipe(
      __map(_r => _r.body as Array<ProductVm>)
    );
  }

  /**
   * @param ProductParams undefined
   */
  postProductsResponse(
    ProductParams: ProductParams
  ): Observable<StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ProductParams;
    let req = new HttpRequest<any>("POST", this.rootUrl + `/products`, __body, {
      headers: this.__headers,
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
   * @param ProductParams undefined
   */
  postProducts(ProductParams: ProductParams): Observable<ProductVm> {
    return this.postProductsResponse(ProductParams).pipe(
      __map(_r => _r.body as null)
    );
  }

  ProductGetoneResponse(id: string): Observable<StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/products/${id}`,
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

  ProductGetone(id: string): Observable<null> {
    return this.ProductGetoneResponse(id).pipe(__map(_r => _r.body as null));
  }

  /**
   * @param ProductParamsPut undefined
   */
  ProductPutResponse(
    ProductParamsPut: ProductParamsPut,
    id: string
  ): Observable<StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ProductParamsPut;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/products/${id}`,
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
   * @param ProductParamsPut undefined
   */
  ProductPut(ProductParamsPut: ProductParamsPut, id: string): Observable<null> {
    return this.ProductPutResponse(ProductParamsPut, id).pipe(
      __map(_r => _r.body as null)
    );
  }
  ProductDeleteResponse(id: string): Observable<StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/products/${id}`,
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
  ProductDelete(id): Observable<null> {
    return this.ProductDeleteResponse(id).pipe(__map(_r => _r.body as null));
  }
  ProductCreatethumbnailResponse(id): Observable<StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/products/${id}/thumbnail`,
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
  ProductCreatethumbnail(id): Observable<null> {
    return this.ProductCreatethumbnailResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
  ProductCreateGalleryResponse(id): Observable<StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/products/${id}/gallery`,
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
  ProductCreateGallery(id): Observable<null> {
    return this.ProductCreateGalleryResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
  ProductDeletegalleryResponse(
    id,
    index
  ): Observable<StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/products/${id}/gallery/${index}`,
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
  ProductDeletegallery(id, index): Observable<null> {
    return this.ProductDeletegalleryResponse(id, index).pipe(
      __map(_r => _r.body as null)
    );
  }
}

namespace ProductService {
  /**
   * Parameters for ProductGet
   */
  export interface ProductGetParams {
    perPage: number;
    page: number;
    category: Array<any>;
    minPrice?: number;
    maxPrice?: number;
    featured?: boolean;
  }
}

export { ProductService };

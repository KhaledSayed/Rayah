import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders
} from "@angular/common/http";

import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AdminInterceptor implements HttpInterceptor {
  // constructor(private readonly authService: AuthService) {
  //   console.log("Admin Interceptor");
  // }

  constructor() {
    console.log("Admin Interceptor");
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("Admin Interceptor");

    // if (this.authService.isAuthenticated()) {
    //   const authReq = req.clone({
    //     headers: new HttpHeaders({
    //       "Content-Type": "application/json",
    //       Authorization: "Bearer " + this.authService.getToken()
    //     })
    //   });

    //   console.log(authReq);
    //   return next.handle(authReq);
    // }

    return next.handle(req);
  }
}

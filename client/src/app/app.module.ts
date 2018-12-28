import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { AdminComponent } from "./layout/admin/admin.component";
import { AuthComponent } from "./layout/auth/auth.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SharedModule } from "./shared/shared.module";
import { MenuItems } from "./shared/menu-items/menu-items";
import { BreadcrumbsComponent } from "./layout/admin/breadcrumbs/breadcrumbs.component";
import { BlankComponent } from "./blank/blank.component";
import { BlankModule } from "./blank/blank.module";
import { ApiModule } from "./api/api.module";
import { JwtModule } from "@auth0/angular-jwt";
import { AdminInterceptor } from "./admin.interceptor";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BaseService } from "./api/base-service";

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AuthComponent,
    BreadcrumbsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    ApiModule,
    JwtModule.forRoot({})
  ],
  schemas: [],
  providers: [MenuItems],
  exports: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule {}

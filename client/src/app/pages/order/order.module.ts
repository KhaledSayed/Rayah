import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../shared/shared.module";
import {
  CategoryService,
  OrderService,
  ProductService,
  UserService,
  CouponService
} from "../../api/services";
import { DataTableModule } from "angular2-datatable";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CreateComponent } from "./create/create.component";
import { FileUploadModule } from "ng2-file-upload";
import { ApiModule } from "src/app/api/api.module";
import { ToastyModule } from "ng2-toasty";
import { UpdateComponent } from "./update/update.component";
import { BrowseComponent } from "./browse/browse.component";
import { ButtonModule } from "src/app/theme/ui-elements/basic/button/button.module";
import { OrderRoutingModule } from "./order-routing.module";
import { OrderComponent } from "./order.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { NotifierModule } from "angular-notifier";
import { SimpleNotificationsModule } from "angular2-notifications";

@NgModule({
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule,
    SharedModule,
    HttpModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    ToastyModule.forRoot(),
    ButtonModule,
    NgSelectModule,
    SimpleNotificationsModule.forRoot()
  ],
  declarations: [
    OrderComponent,
    CreateComponent,
    UpdateComponent,
    BrowseComponent
  ],
  providers: [
    CategoryService,
    OrderService,
    ProductService,
    UserService,
    CouponService
  ]
})
export class OrderModule {}

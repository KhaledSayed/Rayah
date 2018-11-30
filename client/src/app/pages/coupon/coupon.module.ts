import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../shared/shared.module";
import { CategoryService, CouponService } from "../../api/services";
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
import { CouponRoutingModule } from "./coupon-routing.module";
import { CouponComponent } from "./coupon.component";

@NgModule({
  imports: [
    CommonModule,
    CouponRoutingModule,
    SharedModule,
    SharedModule,
    HttpModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    ToastyModule.forRoot(),
    ButtonModule
  ],
  declarations: [
    CouponComponent,
    CreateComponent,
    UpdateComponent,
    BrowseComponent
  ],
  providers: [CouponService, CouponService]
})
export class CouponModule {}

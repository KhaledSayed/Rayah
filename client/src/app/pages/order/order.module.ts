import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../shared/shared.module";
import { CategoryService } from "../../api/services";
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
    ButtonModule
  ],
  declarations: [
    OrderComponent,
    CreateComponent,
    UpdateComponent,
    BrowseComponent
  ],
  providers: [CategoryService]
})
export class SimplePageModule {}

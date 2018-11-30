import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../shared/shared.module";
import { CategoryService } from "../../api/services";
import { DataTableModule } from "angular2-datatable";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CreateComponent } from "./create/create.component";
import { FileUploadModule } from "ng2-file-upload";
import { ToastyModule } from "ng2-toasty";
import { UpdateComponent } from "./update/update.component";
import { BrowseComponent } from "./browse/browse.component";
import { UserRoutingModule } from "./user-routing.module";
import { UserComponent } from "./user.component";

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    SharedModule,
    HttpModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    ToastyModule.forRoot()
  ],
  declarations: [
    UserComponent,
    CreateComponent,
    UpdateComponent,
    BrowseComponent
  ],
  providers: [CategoryService]
})
export class UserModule {}

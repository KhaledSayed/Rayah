import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SimplePageComponent } from "./simple-page.component";
import { SimplePageRoutingModule } from "./simple-page-routing.module";
import { SharedModule } from "../../shared/shared.module";
import { CategoryService } from "../../api/services";
import { DataTableModule } from "angular2-datatable";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { ButtonModule } from "../ui-elements/basic/button/button.module";
import { CreateComponent } from "./create/create.component";
import { FileUploadModule } from "ng2-file-upload";
import { ApiModule } from "src/app/api/api.module";
import { ToastyModule } from "ng2-toasty";
import { UpdateComponent } from './update/update.component';
import { BrowseComponent } from './browse/browse.component';

@NgModule({
  imports: [
    CommonModule,
    SimplePageRoutingModule,
    SharedModule,
    SharedModule,
    HttpModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    ToastyModule.forRoot()
  ],
  declarations: [SimplePageComponent, CreateComponent, UpdateComponent, BrowseComponent],
  providers: [CategoryService]
})
export class SimplePageModule {}

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
import { CategoryRoutingModule } from "./category-routing.module";
import { CategoryComponent } from "./category.component";
import { ButtonModule } from "src/app/theme/ui-elements/basic/button/button.module";

@NgModule({
  imports: [
    CommonModule,
    CategoryRoutingModule,
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
    CategoryComponent,
    CreateComponent,
    UpdateComponent,
    BrowseComponent
  ],
  providers: [CategoryService]
})
export class CategoryModule {}

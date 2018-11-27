import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BlankComponent } from "./blank.component";
import { ApiModule } from "../api/api.module";
import { CategoryService } from "../api/services";
@NgModule({
  imports: [CommonModule, ApiModule],
  providers: [CategoryService],
  declarations: [BlankComponent]
})
export class BlankModule {}

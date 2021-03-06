import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BasicLoginComponent } from "./basic-login.component";
import { BasicLoginRoutingModule } from "./basic-login-routing.module";
import { SharedModule } from "../../../../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { UserService } from "src/app/api/services";

@NgModule({
  imports: [
    CommonModule,
    BasicLoginRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [BasicLoginComponent],
  providers: [UserService]
})
export class BasicLoginModule {}

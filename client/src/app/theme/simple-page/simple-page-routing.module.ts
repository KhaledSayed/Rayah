import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SimplePageComponent } from "./simple-page.component";
import { CreateComponent } from "./create/create.component";

const routes: Routes = [
  {
    path: "",
    component: SimplePageComponent,
    data: {
      title: "Category",
      icon: "icon-layout-sidebar-left",
      caption:
        "lorem ipsum dolor sit amet, consectetur adipisicing elit - sample page",
      status: true
    }
  },
  {
    path: "create",
    component: CreateComponent,
    data: {
      title: "Create",
      icon: "icon-layout-sidebar-left",
      caption:
        "lorem ipsum dolor sit amet, consectetur adipisicing elit - sample page",
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimplePageRoutingModule {}

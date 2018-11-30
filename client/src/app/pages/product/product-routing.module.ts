import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateComponent } from "./create/create.component";
import { UpdateComponent } from "./update/update.component";
import { BrowseComponent } from "./browse/browse.component";
import { ProductComponent } from "./product.component";

const routes: Routes = [
  {
    path: "",
    component: ProductComponent,
    data: {
      title: "Category",
      icon: "icon-layout-sidebar-left",
      caption:
        "lorem ipsum dolor sit amet, consectetur adipisicing elit - sample page",
      status: true
    },
    children: [
      {
        path: "",
        redirectTo: "/simple-page/browse",
        pathMatch: "full"
      },
      {
        path: "browse",
        component: BrowseComponent,
        data: {
          title: "Browse",
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
      },
      {
        path: "update/:id",
        component: UpdateComponent,
        data: {
          title: "Update Category",
          icon: "icon-layout-sidebar-left",
          caption:
            "lorem ipsum dolor sit amet, consectetur adipisicing elit - sample page",
          status: true
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {}

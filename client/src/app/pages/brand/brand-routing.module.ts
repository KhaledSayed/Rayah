import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateComponent } from "./create/create.component";
import { UpdateComponent } from "./update/update.component";
import { BrowseComponent } from "./browse/browse.component";
import { BrandComponent } from "./brand.component";

const routes: Routes = [
  {
    path: "",
    component: BrandComponent,
    data: {
      title: "العلامات التجارية",
      icon: "icon-layout-sidebar-left",
      caption:
        "lorem ipsum dolor sit amet, consectetur adipisicing elit - sample page",
      status: true
    },
    children: [
      {
        path: "",
        redirectTo: "/brands/browse",
        pathMatch: "full"
      },
      {
        path: "browse",
        component: BrowseComponent,
        data: {
          title: "تصفح",
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
          title: "إنشاء",
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
          title: "تحديث",
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
export class BrandRoutingModule {}

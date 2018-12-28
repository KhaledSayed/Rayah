import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateComponent } from "./create/create.component";
import { UpdateComponent } from "./update/update.component";
import { BrowseComponent } from "./browse/browse.component";
import { OrderComponent } from "./order.component";
import { CashierComponent } from "./cashier/cashier.component";
import { CollectorComponent } from "./collector/collector.component";

const routes: Routes = [
  {
    path: "",
    component: OrderComponent,
    data: {
      title: "طلبات العملاء",
      icon: "icon-layout-sidebar-left",
      caption:
        "lorem ipsum dolor sit amet, consectetur adipisicing elit - sample page",
      status: true
    },
    children: [
      {
        path: "",
        redirectTo: "/orders/browse",
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
          title: "إنشاء ",
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
          title: "تعديل ",
          icon: "icon-layout-sidebar-left",
          caption:
            "lorem ipsum dolor sit amet, consectetur adipisicing elit - sample page",
          status: true
        }
      },
      {
        path: "cashier/:id",
        component: CashierComponent,
        data: {
          title: "تحديث الحالة          ",
          icon: "icon-layout-sidebar-left",
          caption:
            "lorem ipsum dolor sit amet, consectetur adipisicing elit - sample page",
          status: true
        }
      },
      {
        path: "collector/:id",
        component: CollectorComponent,
        data: {
          title: "تحديث الحالة ",
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
export class OrderRoutingModule {}

import {
  Component,
  OnInit,
  ViewEncapsulation,
  AfterContentInit,
  AfterViewInit
} from "@angular/core";
import { CategoryVm, OrderVm } from "src/app/api/models";
import { CategoryService, OrderService } from "src/app/api/services";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ToastyService, ToastOptions, ToastData } from "ng2-toasty";
import swal from "sweetalert2";
import { NotifierService } from "angular-notifier";
import { NotificationsService } from "angular2-notifications";

@Component({
  selector: "app-browse",
  templateUrl: "./browse.component.html",
  styleUrls: [
    "./browse.component.scss",
    "./../../../../assets/icon/icofont/css/icofont.scss",
    "./../../../../../node_modules/ng2-toasty/style.css",
    "./../../../../../node_modules/ng2-toasty/style-bootstrap.css",
    "./../../../../../node_modules/ng2-toasty/style-default.css",
    "./../../../../../node_modules/ng2-toasty/style-material.css",
    "./../../../../../node_modules/angular-notifier/styles/core.scss",
    "./../../../../../node_modules/angular-notifier/styles/types/type-success.scss",
    "./../../../../../node_modules/angular-notifier/styles/themes/theme-material.scss"
  ],
  encapsulation: ViewEncapsulation.None
})
export class BrowseComponent implements OnInit, AfterViewInit {
  public data: any;
  public rowsOnPage = 10;
  public filterQuery = "";
  public sortBy = "";
  public sortOrder = "desc";
  public currentPage = 0;
  public numberOfPages = 10;
  public myParam: any = "";
  private orders: OrderVm[];

  //Notifications Optiona
  position = "top-right";
  showClose = true;
  theme = "default";
  type = "success";
  closeOther = true;

  //end Notification Options
  constructor(
    private readonly _categoryService: CategoryService,
    private readonly route: ActivatedRoute,
    private readonly toastyService: ToastyService,
    private readonly router: Router,
    private readonly _orderService: OrderService,
    private _service: NotificationsService
  ) {}

  ngAfterViewInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.myParam = params.post;
      console.log(typeof params.post);
      console.log(this.myParam);

      if (params.post === "true") {
        console.log("Fire Notification Post");
        this.showNotification(
          "Order Status",
          "Order Created Successfully",
          "success"
        );
      } else if (params.update === "true") {
        console.log("Fire Notification Update");
        this.showNotification(
          "Order Update",
          "Order Updated Successfully",
          "success"
        );
      }
    });
    this.getOrders();
  }

  fireNotification(options) {
    if (options.closeOther) {
      this.toastyService.clearAll();
    }

    this.position = options.position ? options.position : this.position;
    const toastOptions: ToastOptions = {
      title: options.title,
      msg: options.msg,
      showClose: options.showClose,
      timeout: options.timeout,
      theme: options.theme,
      onAdd: (toast: ToastData) => {
        /* added */
        console.log("Toast Created", toast);
      },
      onRemove: (toast: ToastData) => {
        /* removed */
        console.log("toast removed", toast);
      }
    };

    console.log("Debug Notification");
    switch (options.type) {
      case "default":
        this.toastyService.default(toastOptions);
        break;
      case "info":
        this.toastyService.info(toastOptions);
        break;
      case "success":
        this.toastyService.success(toastOptions);
        break;
      case "wait":
        this.toastyService.wait(toastOptions);
        break;
      case "error":
        this.toastyService.error(toastOptions);
        break;
      case "warning":
        this.toastyService.warning(toastOptions);
        break;
    }
  }

  ngOnInit() {}

  getOrders() {
    this._orderService
      .OrderGet({
        perPage: 100,
        page: this.currentPage,
        status: ["Created", "Processing", "Shipped", "Canceled", "Refunded"]
      })
      .subscribe(results => {
        console.log(results);
        this.orders = [...results];
        this.data = [...results];
      });
  }

  delete(category) {
    swal({
      title: "Are you sure?",
      text: "You not be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      confirmButtonClass: "btn btn-success",
      cancelButtonClass: "btn btn-danger mr-sm"
    }).then(result => {
      if (result.value) {
        swal("Deleted!", "Your file has been deleted.", "success").then(
          result => {
            this._orderService.OrderDelete(category.id).subscribe(result => {
              this.getOrders();
            });

            this.fireNotification({
              title: "Category Alert",
              msg: "Category Deleted Successfully",
              type: "danger",
              showClose: this.showClose,
              theme: this.theme,
              position: this.position,
              timeout: 5000
            });
          }
        );
      } else if (result.dismiss) {
        swal("Cancelled", "Your imaginary file is safe :)", "error");
      }
    });
  }

  goToUpdate(category) {
    console.log(category);
    this.router.navigate(["orders", "update", category.id]);
  }

  showNotification(title, description, type = "success") {
    console.log("Show Notifications");
    if (type === "success") {
      this._service.success(title, description, {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: false,
        clickIconToClose: true,
        rtl: false,
        preventDuplicates: true,
        position: ["top", "right"]
      });
    } else {
      this._service.error(title, description, {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: false,
        clickIconToClose: true,
        rtl: false,
        preventDuplicates: true,
        position: ["top", "right"]
      });
    }
  }
}

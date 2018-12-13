import {
  Component,
  OnInit,
  ViewEncapsulation,
  AfterViewInit
} from "@angular/core";
import { CategoryVm } from "src/app/api/models";
import { CategoryService } from "src/app/api/services";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ToastyService, ToastOptions, ToastData } from "ng2-toasty";
import swal from "sweetalert2";

@Component({
  selector: "app-browse",
  templateUrl: "./browse.component.html",
  styleUrls: [
    "./browse.component.scss",
    "./../../../../assets/icon/icofont/css/icofont.scss",
    "./../../../../../node_modules/ng2-toasty/style.css",
    "./../../../../../node_modules/ng2-toasty/style-bootstrap.css",
    "./../../../../../node_modules/ng2-toasty/style-default.css",
    "./../../../../../node_modules/ng2-toasty/style-material.css"
  ],
  encapsulation: ViewEncapsulation.None
})
export class BrowseComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.myParam = params.post;
      console.log(typeof params.post);
      console.log(this.myParam);

      if (params.post === "true") {
        console.log("Fire Notification Post");
        this.fireNotification({
          title: "Category Alert",
          msg: "Category Created Successfully",
          type: "success",
          showClose: this.showClose,
          theme: this.theme,
          position: this.position,
          timeout: 5000
        });
      }

      if (params.parent) {
        this._categoryService
          .CategoryGet({ page: 0, perPage: 1000, parent: params.parent })
          .subscribe(results => {
            console.log("Subcategories", results);
            if (results.length === 0) {
              this.fireNotification({
                title: "تنبيه",
                msg: "لا يوجد أقسام فرعية لهذا القسم",
                type: "error",
                showClose: this.showClose,
                theme: this.theme,
                position: this.position,
                timeout: 5000
              });
            } else {
              console.log(results);
              this.categories = [...results];
              this.data = [...results];
            }
          });
      }
    });
  }
  public data: any;
  public rowsOnPage = 10;
  public filterQuery = "";
  public sortBy = "";
  public sortOrder = "desc";
  public currentPage = 0;
  public numberOfPages = 10;
  public myParam: any = "";
  private categories: CategoryVm[];

  //Notifications Optiona
  position = "top-right";
  showClose = true;
  theme = "material";
  type = "success";
  closeOther = true;

  //end Notification Options
  constructor(
    private readonly _categoryService: CategoryService,
    private readonly route: ActivatedRoute,
    private readonly toastyService: ToastyService,
    private readonly router: Router
  ) {}

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

  ngOnInit() {
    this.getCategories();
  }

  getCategories(parent = null) {
    this._categoryService
      .CategoryGet({
        parent: null,
        perPage: 100,
        page: this.currentPage
      })
      .subscribe(results => {
        console.log(results);
        this.categories = [...results];
        this.data = [...results];
      });
  }

  delete(category) {
    swal({
      title: "هل أنت واثق؟",
      text: "لن تكون قادرًا على التراجع عن هذا!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم ، احذفها!",
      cancelButtonText: "لا ، ألغ!",
      confirmButtonClass: "btn btn-success",
      cancelButtonClass: "btn btn-danger mr-sm"
    }).then(result => {
      if (result.value) {
        swal("تم الحذف!", "تم حذف القسم.", "success").then(result => {
          this._categoryService
            .CategoryDelete(category.id)
            .subscribe(result => {
              this.getCategories();
            });

          this.fireNotification({
            title: "تنبيه",
            msg: `تم حذف القسم ${category.name} بنجاح`,
            type: "success",
            showClose: this.showClose,
            theme: this.theme,
            position: this.position,
            timeout: 3000
          });
        });
      } else if (result.dismiss) {
        swal("ألغيت", "لن يتم إجراء عملية الحذف :)", "error");
      }
    });
  }

  goToUpdate(category) {
    console.log(category);
    this.router.navigate(["simple-page", "update", category.id]);
  }

  browseSubcategories(category) {
    console.log(category.id);
    this.router.navigate(["simple-page", "browse"], {
      queryParams: { parent: category.id }
    });
  }
}

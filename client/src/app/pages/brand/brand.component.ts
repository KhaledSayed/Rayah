import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { CategoryService } from "src/app/api/services";
import { CategoryVm } from "src/app/api/models";
import { Params, Router, ActivatedRoute } from "@angular/router";
import { ToastyService, ToastOptions, ToastData } from "ng2-toasty";
import swal from "sweetalert2";

@Component({
  selector: "app-brand",
  templateUrl: "./brand.component.html",
  styleUrls: ["./brand.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class BrandComponent implements OnInit {
  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }
}

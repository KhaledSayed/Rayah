import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { CategoryService } from "src/app/api/services";
import { CategoryVm } from "src/app/api/models";
import { Params, Router, ActivatedRoute } from "@angular/router";
import { ToastyService, ToastOptions, ToastData } from "ng2-toasty";
import swal from "sweetalert2";

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class OrderComponent implements OnInit {
  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }
}

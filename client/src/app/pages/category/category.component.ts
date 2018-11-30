import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { CategoryService } from "src/app/api/services";
import { CategoryVm } from "src/app/api/models";
import { Params, Router, ActivatedRoute } from "@angular/router";
import { ToastyService, ToastOptions, ToastData } from "ng2-toasty";
import swal from "sweetalert2";

@Component({
  selector: "app-simple-page",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class CategoryComponent implements OnInit {
  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }
}

import { Component, OnInit } from "@angular/core";
import { CategoryService } from "src/app/api/services";
import { CategoryVm } from "src/app/api/models";

@Component({
  selector: "app-simple-page",
  templateUrl: "./simple-page.component.html",
  styleUrls: [
    "./simple-page.component.scss",
    "./../../../assets/icon/icofont/css/icofont.scss"
  ]
})
export class SimplePageComponent implements OnInit {
  public data: any;
  public rowsOnPage = 10;
  public filterQuery = "";
  public sortBy = "";
  public sortOrder = "desc";
  public currentPage = 0;
  public numberOfPages = 10;

  private categories: CategoryVm[];

  constructor(private readonly _categoryService: CategoryService) {}

  ngOnInit() {
    this._categoryService
      .CategoryGet({
        perPage: 100,
        page: this.currentPage
      })
      .subscribe(results => {
        console.log(results);
        this.categories = [...results];
        this.data = [...results];
      });
  }
}

import { Component, OnInit } from "@angular/core";
import { CategoryService } from "../api/services";
import { Observable } from "rxjs";
import { CategoryVm } from "../api/models";
@Component({
  selector: "app-blank",
  templateUrl: "./blank.component.html",
  styleUrls: ["./blank.component.scss"]
})
export class BlankComponent implements OnInit {
   categories: CategoryVm[];
  constructor(private readonly cateogryService: CategoryService) {}

  async ngOnInit() {
    // this.cateogryService
    //   .CategoryGet({
    //     perPage: 5,
    //     page: 0
    //   })
    //   .subscribe(results => {
    //     console.log(results);
    //     this.categories = [...results];
    //   });
  }
}

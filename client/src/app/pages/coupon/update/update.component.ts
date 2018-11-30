import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpResponse } from "@angular/common/http";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CouponVm, CouponPutParams } from "src/app/api/models";
import { Observable } from "rxjs";
import { FileUploader } from "ng2-file-upload";
import { CategoryService, CouponService } from "src/app/api/services";

import {
  NgbDateStruct,
  NgbDateParserFormatter,
  NgbCalendar
} from "@ng-bootstrap/ng-bootstrap";

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one &&
  two &&
  two.year === one.year &&
  two.month === one.month &&
  two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two
    ? false
    : one.year === two.year
    ? one.month === two.month
      ? one.day === two.day
        ? false
        : one.day < two.day
      : one.month < two.month
    : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two
    ? false
    : one.year === two.year
    ? one.month === two.month
      ? one.day === two.day
        ? false
        : one.day > two.day
      : one.month > two.month
    : one.year > two.year;

const now = new Date();

const URL = "";
@Component({
  selector: "app-update",
  templateUrl: "./update.component.html",
  styleUrls: ["./update.component.scss"]
})
export class UpdateComponent implements OnInit {
  hoveredDate: NgbDateStruct;
  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;
  disabled = false;
  displayMonths = 3;
  navigation = "select";
  showWeekNumbers = false;

  @Input() testRangeDate: Date;

  modelPopup: NgbDateStruct;
  public date: { year: number; month: number };

  modelDisabled: NgbDateStruct = {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate()
  };
  currentCoupon: CouponVm;

  isWeekend(date: NgbDateStruct) {
    const d = new Date(date.year, date.month - 1, date.day);
    return d.getDay() === 0 || d.getDay() === 6;
  }

  isDisabled(date: NgbDateStruct, current: { month: number }) {
    return date.month !== current.month;
  }

  isHovered = date =>
    this.fromDate &&
    !this.toDate &&
    this.hoveredDate &&
    after(date, this.fromDate) &&
    before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);

  selectToday() {
    this.modelPopup = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate()
    };
  }

  onDateChange(date: NgbDateStruct) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }

    console.log("From:");
    console.log(this.fromDate);

    console.log("To");
    console.log(this.toDate);
  }

  typeSelect: string = "Fixed";

  myForm: FormGroup;
  submitted: boolean;
  selectedFile: File;
  selectedValue: string = "test";
  loaded: boolean = false;
  uploader: FileUploader = new FileUploader({
    isHTML5: true,
    url: URL
  });
  selectedImage: any = "";
  idParam: any;

  constructor(
    private readonly categoryService: CategoryService,
    private readonly router: Router,
    private readonly activatedRouter: ActivatedRoute,
    public parserFormatter: NgbDateParserFormatter,
    public calendar: NgbCalendar,
    private readonly couponService: CouponService
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), "d", 10);
    const windowWidth = window.innerWidth;
    if (windowWidth >= 768 && windowWidth <= 1024) {
      this.displayMonths = 2;
      this.navigation = "select";
    } else if (windowWidth < 768) {
      this.displayMonths = 1;
      this.navigation = "select";
    } else {
      this.displayMonths = 3;
      this.navigation = "none";
    }

    const numberOfPeople = new FormControl("");
    const name = new FormControl("");

    const code = new FormControl("");
    const value = new FormControl("");
    const type = new FormControl("");
    const rangeDate = new FormControl("");
    const minTotal = new FormControl("");
    const maxTotal = new FormControl("");

    this.myForm = new FormGroup({
      type: type,
      code: code,
      value: value,
      name: name,
      rangeDate: rangeDate,
      numberOfPeople: numberOfPeople,
      minTotal: minTotal,
      maxTotal: maxTotal
    });

    this.myForm.controls["type"].setValue("Fixed");
  }

  onSubmit() {
    this.submitted = true;
    // this.categoryService.CategoryCreate();
    // parserFormatter.format(toDate)

    let couponParams: CouponPutParams = {
      type: this.myForm.controls.type.value,
      code: this.myForm.controls.code.value,
      value: parseInt(this.myForm.controls.value.value),
      numberOfPeople: parseInt(this.myForm.controls.numberOfPeople.value),
      minTotal: parseInt(this.myForm.controls.minTotal.value),
      maxTotal: parseInt(this.myForm.controls.maxTotal.value),
      startDate: new Date(this.parserFormatter.format(this.fromDate)),
      endDate: new Date(this.parserFormatter.format(this.toDate))
    };

    this.couponService.CouponPut(couponParams, this.currentCoupon.id).subscribe(
      results => {
        console.log(results);

        this.router.navigate(["coupons", "browse"], {
          queryParams: { update: "true" }
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    console.log("ngOnInit");
    this.activatedRouter.params.subscribe(params => {
      const id = params.id;

      this.idParam = id;

      this.loadCoupon(this.idParam);
    });
  }

  loadCoupon(id) {
    this.couponService.getCouponsId(id).subscribe(result => {
      this.currentCoupon = { ...result };
      this.myForm.controls["code"].setValue(result.code);
      this.myForm.controls["type"].setValue(result.type);
      this.myForm.controls["value"].setValue(result.value);
      this.myForm.controls["minTotal"].setValue(result.minTotal);
      this.myForm.controls["maxTotal"].setValue(result.maxTotal);
      this.myForm.controls["numberOfPeople"].setValue(result.numberOfPeople);
      // this.isFrom(result.startDate);
      // this.isTo(result.endDate);

      // console.log(this.fromDate);
      // console.log(this.toDate);

      this.onDateChange(
        this.parserFormatter.parse(result.startDate.toString())
      );
      this.onDateChange(this.parserFormatter.parse(result.endDate.toString()));
    });
  }
}

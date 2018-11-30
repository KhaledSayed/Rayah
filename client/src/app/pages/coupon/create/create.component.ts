import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CustomValidators } from "ng2-validation";
import { FileUploader } from "ng2-file-upload";
import { CategoryService, CouponService } from "src/app/api/services";
import { CategoryVm, CouponParams } from "src/app/api/models";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { HttpHeaders, HttpResponse } from "@angular/common/http";
import {
  NgbCalendar,
  NgbDateParserFormatter,
  NgbDateStruct
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
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateComponent implements OnInit {
  hoveredDate: NgbDateStruct;
  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;
  disabled = false;
  displayMonths = 3;
  navigation = "select";
  showWeekNumbers = false;

  @Input() testRangeDate: Date;

  typeSelect: string = "Fixed";
  myForm: FormGroup;
  submitted: boolean;
  selectedFile: File;
  selectedValue: string = "test";
  categoryAr: CategoryVm[];
  loaded: boolean = false;
  courseObservable: Observable<CategoryVm[]>;
  selectedItem: CategoryVm = null;
  uploader: FileUploader = new FileUploader({
    isHTML5: true,
    url: URL
  });
  selectedImage: any = "";

  modelPopup: NgbDateStruct;
  public date: { year: number; month: number };

  modelDisabled: NgbDateStruct = {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate()
  };

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

  constructor(
    private readonly categoryService: CategoryService,
    private readonly couponService: CouponService,
    private readonly router: Router,
    public parserFormatter: NgbDateParserFormatter,
    public calendar: NgbCalendar
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

    // this.loadCategories();
    /*Basic validation end*/
  }

  loadCategories() {
    // this.categoryAr = [];
    // this.courseObservable = this.categoryService.CategoryGet({
    //   perPage: 100,
    //   page: 0,
    //   parent: null
    // });
    // this.courseObservable.subscribe(results => {
    //   this.selectedItem = results[0];
    //   console.log(this.selectedItem);
    //   this.categoryAr = [...results];
    // });
  }

  onSubmit() {
    this.submitted = true;
    // parserFormatter.format(toDate)

    const couponData = new FormData();
    couponData.append("code", this.myForm.controls.code.value);
    couponData.append("value", this.myForm.controls.value.value);
    couponData.append(
      "numberOfPeople",
      this.myForm.controls.numberOfPeople.value
    );
    couponData.append("minTotal", this.myForm.controls.minTotal.value);
    couponData.append(
      "startDate",
      new Date(this.parserFormatter.format(this.fromDate)).toISOString()
    );
    couponData.append(
      "endDate",
      new Date(this.parserFormatter.format(this.toDate)).toISOString()
    );

    let couponParams: CouponParams = {
      type: this.myForm.controls.type.value,
      code: this.myForm.controls.code.value,
      value: parseInt(this.myForm.controls.value.value),
      numberOfPeople: parseInt(this.myForm.controls.numberOfPeople.value),
      minTotal: parseInt(this.myForm.controls.minTotal.value),
      maxTotal: parseInt(this.myForm.controls.maxTotal.value),
      startDate: new Date(this.parserFormatter.format(this.fromDate)),
      endDate: new Date(this.parserFormatter.format(this.toDate))
    };

    this.couponService.CouponPost(couponParams).subscribe(
      results => {
        console.log(results);

        this.router.navigate(["coupons", "browse"], {
          queryParams: { post: "true" }
        });
      },
      error => {
        console.log(error);
      }
    );

    // this.categoryService.CategoryCreate();
    // console.log(this.myForm);

    // console.log(this.myForm.controls.description.value);
    // console.log(this.myForm.controls.name.value);

    // const uploadData = new FormData();
    // uploadData.append("thumbnail", this.selectedFile, this.selectedFile.name);
    // uploadData.append("parent", this.myForm.controls.parent.value);
    // uploadData.append("name", this.myForm.controls.name.value);
    // uploadData.append("description", this.myForm.controls.description.value);

    // this.categoryService
    //   .onTestMultipart(uploadData)
    //   .subscribe((res: HttpResponse<any>) => {
    //     console.log("===========");
    //     console.log(res);
    //     console.log("===========");

    //     if (res.status && res.status === 201) {
    //       console.log("Redirect to Next Page");
    //       const post = true;
    //       this.router.navigate(["simple-page", "browse"], {
    //         queryParams: { post: "true" }
    //       });

    //       this.loadCategories();
    //     }
    //   });
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = event => {
        // called once readAsDataURL is completed
        this.selectedImage = (<FileReader>event.target).result;
      };
    }
  }

  ngOnInit() {
    console.log("ngOnInit");
  }
}

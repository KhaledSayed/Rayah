import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpResponse } from "@angular/common/http";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CategoryVm, CouponVm, BrandVm } from "src/app/api/models";
import { Observable } from "rxjs";
import { FileUploader } from "ng2-file-upload";
import { CategoryService, BrandService } from "src/app/api/services";

const URL = "";
@Component({
  selector: "app-update",
  templateUrl: "./update.component.html",
  styleUrls: ["./update.component.scss"]
})
export class UpdateComponent implements OnInit {
  categoryObservable: Observable<CategoryVm> = null;
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
  idParam: any;
  currentBrand: BrandVm;

  constructor(
    private readonly categoryService: CategoryService,
    private readonly router: Router,
    private readonly activatedRouter: ActivatedRoute,
    private readonly brandService: BrandService
  ) {
    const name = new FormControl("", Validators.required);
    const description = new FormControl("");
    const parent = new FormControl("");
    const banner = new FormControl("");
    // const rpassword = new FormControl("", [
    //   Validators.required,
    //   CustomValidators.equalTo(password)
    // ]);
    this.myForm = new FormGroup({
      name: name,
      banner: banner
    });

    // this.loadCategories();

    /*Basic validation end*/
  }

  loadCategories() {
    this.categoryAr = [];

    this.courseObservable = this.categoryService.CategoryGet({
      perPage: 100,
      page: 0,
      parent: null
    });

    this.courseObservable.subscribe(results => {
      this.categoryAr = [...results];
    });
  }

  loadBrand(id) {
    this.brandService.findOne(id).subscribe(
      results => {
        this.currentBrand = results;
        this.myForm.controls["name"].setValue(results.name);
        this.selectedImage = `http://localhost:8080/${results.logo}`;
        console.log(this.selectedItem);
      },
      err => {
        console.log(err);
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    // this.categoryService.CategoryCreate();
    console.log(this.myForm);

    const uploadData = new FormData();

    console.log("Selected Image", this.selectedImage);
    console.log("http://localhost:8080/" + this.currentBrand.logo);
    if (
      this.selectedImage !== `http://localhost:8080/${this.currentBrand.logo}`
    ) {
      console.log("Selected Image True");

      uploadData.append("banner", this.selectedFile, this.selectedFile.name);
    } else {
      console.log("Selected Image False");
    }

    uploadData.append("id", this.currentBrand.id);
    uploadData.append("name", this.myForm.controls.name.value);

    this.brandService
      .onPutTestMultipart(uploadData)
      .subscribe((res: HttpResponse<any>) => {
        console.log("===========");
        console.log(res);
        console.log("===========");

        if (res.status && res.status === 200) {
          console.log("Redirect to Next Page");
          const post = true;
          this.router.navigate(["brands", "browse"], {
            queryParams: { update: "true" }
          });
        }
      });
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
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
    this.activatedRouter.params.subscribe(params => {
      const id = params.id;

      this.idParam = id;

      this.loadBrand(this.idParam);
    });
  }
}

import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CustomValidators } from "ng2-validation";
import { FileUploader } from "ng2-file-upload";
import { CategoryService, BrandService } from "src/app/api/services";
import { CategoryVm } from "src/app/api/models";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { HttpHeaders, HttpResponse } from "@angular/common/http";

const URL = "";
@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateComponent implements OnInit {
  myForm: FormGroup;
  submitted: boolean;
  selectedFile: File;
  selectedValue: string = "test";
  loaded: boolean = false;
  courseObservable: Observable<CategoryVm[]>;
  selectedItem: CategoryVm = null;
  uploader: FileUploader = new FileUploader({
    isHTML5: true,
    url: URL
  });
  selectedImage: any = "";

  constructor(
    private readonly _brandService: BrandService,
    private readonly router: Router
  ) {
    const name = new FormControl("", Validators.required);
    const banner = new FormControl("", Validators.required);
    // const rpassword = new FormControl("", [
    //   Validators.required,
    //   CustomValidators.equalTo(password)
    // ]);
    this.myForm = new FormGroup({
      name: name,
      banner: banner
    });

    /*Basic validation end*/
  }

  onSubmit() {
    this.submitted = true;
    // this.categoryService.CategoryCreate();

    const uploadData = new FormData();
    uploadData.append("banner", this.selectedFile, this.selectedFile.name);
    uploadData.append("name", this.myForm.controls.name.value);

    this._brandService
      .onTestMultipart(uploadData)
      .subscribe((res: HttpResponse<any>) => {
        console.log("===========");
        console.log(res);
        console.log("===========");

        if (res.status && res.status === 201) {
          console.log("Redirect to Next Page");
          const post = true;
          this.router.navigate(["brands", "browse"], {
            queryParams: { post: "true" }
          });

          // this.loadCategories();
        }
      });
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

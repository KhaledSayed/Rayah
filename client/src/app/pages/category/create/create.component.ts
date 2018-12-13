import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CustomValidators } from "ng2-validation";
import { FileUploader } from "ng2-file-upload";
import { CategoryService } from "src/app/api/services";
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
  categoryAr: CategoryVm[];
  loaded: boolean = false;
  courseObservable: Observable<CategoryVm[]>;
  selectedItem: CategoryVm = null;
  uploader: FileUploader = new FileUploader({
    isHTML5: true,
    url: URL
  });
  selectedImage: any = "";

  constructor(
    private readonly categoryService: CategoryService,
    private readonly router: Router
  ) {
    const name = new FormControl("", Validators.required);
    const description = new FormControl("");
    const parent = new FormControl("");
    const thumbnail = new FormControl("", Validators.required);
    // const rpassword = new FormControl("", [
    //   Validators.required,
    //   CustomValidators.equalTo(password)
    // ]);
    this.myForm = new FormGroup({
      name: name,
      parent: parent,
      description: description,
      thumbnail: thumbnail
    });

    this.loadCategories();
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
      this.selectedItem = results[0];
      console.log(this.selectedItem);
      this.categoryAr = [...results];
      this.categoryAr.push({
        id: null,
        name: "بدون فرع",
        parent: null,
        thumbnail: ""
      });
    });
  }

  onSubmit() {
    this.submitted = true;
    // this.categoryService.CategoryCreate();
    console.log(this.myForm);

    console.log(this.myForm.controls.description.value);
    console.log(this.myForm.controls.name.value);

    const uploadData = new FormData();
    uploadData.append("thumbnail", this.selectedFile, this.selectedFile.name);
    uploadData.append("parent", this.myForm.controls.parent.value);
    uploadData.append("name", this.myForm.controls.name.value);
    uploadData.append("description", this.myForm.controls.description.value);

    this.categoryService
      .onTestMultipart(uploadData)
      .subscribe((res: HttpResponse<any>) => {
        console.log("===========");
        console.log(res);
        console.log("===========");

        if (res.status && res.status === 201) {
          console.log("Redirect to Next Page");
          const post = true;
          this.router.navigate(["simple-page", "browse"], {
            queryParams: { post: "true" }
          });

          this.loadCategories();
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

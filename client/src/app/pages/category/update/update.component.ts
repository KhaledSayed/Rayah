import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpResponse } from "@angular/common/http";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CategoryVm } from "src/app/api/models";
import { Observable } from "rxjs";
import { FileUploader } from "ng2-file-upload";
import { CategoryService } from "src/app/api/services";

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
  currentCategory: CategoryVm;

  constructor(
    private readonly categoryService: CategoryService,
    private readonly router: Router,
    private readonly activatedRouter: ActivatedRoute
  ) {
    const name = new FormControl("", Validators.required);
    const description = new FormControl("");
    const parent = new FormControl("");
    const thumbnail = new FormControl("");

    this.myForm = new FormGroup({
      name: name,
      parent: parent,
      description: description,
      thumbnail: thumbnail
    });

    /*Basic validation end*/
  }

  loadCategories() {
    this.courseObservable = this.categoryService.CategoryGet({
      perPage: 100,
      page: 0,
      parent: null
    });

    this.courseObservable.subscribe(results => {
      console.log("Categories", results);
      this.loadCategory(this.idParam, results);
    });
  }

  loadCategory(id, categories = []) {
    this.categoryService.findOne(id).subscribe(
      results => {
        console.log(results);
        this.currentCategory = results;
        this.myForm.controls["name"].setValue(results.name);
        if (results.parent != null) {
          this.myForm.controls["parent"].setValue(results.parent.id);
        }
        this.myForm.controls["description"].setValue(results.description);
        console.log("Description", this.myForm.controls.description.value);
        this.selectedItem = results.parent;
        this.selectedImage = `http://142.93.207.35:8080/${results.thumbnail}`;
        console.log(this.selectedImage);
        this.categoryAr = [];
        this.categoryAr.push({
          id: null,
          name: "بدون فرع",
          parent: null,
          thumbnail: ""
        });

        categories.forEach(item => {
          if (results.id !== item.id) {
            this.categoryAr.push(item);
          }
          console.log("###");
        });
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
    console.log("http://142.93.207.35:8080/" + this.currentCategory.thumbnail);
    if (
      this.selectedImage !==
      `http://142.93.207.35:8080/${this.currentCategory.thumbnail}`
    ) {
      console.log("Selected Image True");

      uploadData.append("thumbnail", this.selectedFile, this.selectedFile.name);
    } else {
      console.log("Selected Image False");
    }

    uploadData.append("parent", this.myForm.controls.parent.value);
    uploadData.append("name", this.myForm.controls.name.value);
    uploadData.append("description", this.myForm.controls.description.value);
    uploadData.append("id", this.currentCategory.id);

    this.categoryService
      .onPutTestMultipart(uploadData)
      .subscribe((res: HttpResponse<any>) => {
        console.log("===========");
        console.log(res);
        console.log("===========");

        if (res.status && res.status === 200) {
          console.log("Redirect to Next Page");
          const post = true;
          this.router.navigate(["simple-page", "browse"], {
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

      this.loadCategories();
    });
  }
}

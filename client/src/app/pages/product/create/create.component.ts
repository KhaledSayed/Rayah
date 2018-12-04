import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CustomValidators } from "ng2-validation";
import { FileUploader } from "ng2-file-upload";
import { CategoryService, ProductService } from "src/app/api/services";
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
    private readonly router: Router,
    private readonly productService: ProductService
  ) {
    const name = new FormControl("", Validators.required);
    const description = new FormControl("");
    const code = new FormControl("");
    const quantity = new FormControl("");
    const price = new FormControl("");

    const parent = new FormControl("");
    const thumbnail = new FormControl("", Validators.required);
    const gallery = new FormControl("", Validators.required);
    // const rpassword = new FormControl("", [
    //   Validators.required,
    //   CustomValidators.equalTo(password)
    // ]);
    this.myForm = new FormGroup({
      name: name,
      parent: parent,
      code: code,
      quantity: quantity,
      price: price,
      description: description,
      thumbnail: thumbnail,
      gallery: gallery
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
    });
  }

  onSubmit() {
    this.submitted = true;

    const name = this.myForm.controls["name"].value;
    const description = this.myForm.controls["description"].value;
    const quantity = this.myForm.controls["quantity"].value;
    const price = this.myForm.controls["price"].value;
    const code = this.myForm.controls["code"].value;
    const category = this.myForm.controls["parent"].value;
    let id = "";
    this.productService
      .postProducts({
        name: name,
        quantity: parseInt(quantity),
        price: parseInt(price),
        code: code,
        category: category
      })
      .subscribe(results => {
        id = results.id;
        const formData = new FormData();
        formData.append("banner", this.selectedFile, this.selectedFile.name);
        this.productService
          .onPutTestMultipart(formData, results.id)
          .subscribe((results: HttpResponse<any>) => {
            console.log("Thumbnail Response", results);
            if (results.status && results.status === 200) {
              const galleryData = new FormData();

              console.log(this.gallery);
              for (let i = 0; i < this.gallery.length; i++) {
                console.log(this.gallery[i]);
                galleryData.append(
                  `gallery[]`,
                  this.gallery[i],
                  this.gallery[i].name
                );
              }

              this.productService
                .onPutTestMultipartGallery(galleryData, id)
                .subscribe((results: HttpResponse<any>) => {
                  console.log("Gallery Results", results);
                  if (results.status && results.status === 200) {
                    console.log("Redirect to Next Page");
                    const post = true;
                    this.router.navigate(["products", "browse"], {
                      queryParams: { post: "true" }
                    });
                  }
                });
            }
          });
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
  urls = new Array<string>();
  gallery = new Array<File>();

  onGalleryChanged(event) {
    this.urls = [];
    this.gallery = [];
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        this.gallery.push(file);
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  ngOnInit() {
    console.log("ngOnInit");
  }
}

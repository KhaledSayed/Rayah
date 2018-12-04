import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpResponse } from "@angular/common/http";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CategoryVm, ProductVm } from "src/app/api/models";
import { Observable } from "rxjs";
import { FileUploader } from "ng2-file-upload";
import { CategoryService, ProductService } from "src/app/api/services";

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
  selectedGallery: { src: string; type: string }[] = null;
  idParam: any;
  currentProduct: ProductVm;

  constructor(
    private readonly categoryService: CategoryService,
    private readonly productService: ProductService,
    private readonly router: Router,
    private readonly activatedRouter: ActivatedRoute
  ) {
    const name = new FormControl("", Validators.required);
    const description = new FormControl("");
    const code = new FormControl("");
    const quantity = new FormControl("");
    const price = new FormControl("");

    const parent = new FormControl("");
    const thumbnail = new FormControl("");
    const gallery = new FormControl("");
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
          this.selectedGallery.push({
            type: "local",
            src: e.target.result
          });
        };
        reader.readAsDataURL(file);
      }
    }
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

  loadProduct(id) {
    this.productService.findOne(id).subscribe(
      results => {
        this.currentProduct = results;
        this.myForm.controls["name"].setValue(results.name);
        this.myForm.controls["code"].setValue(results.code);
        this.myForm.controls["price"].setValue(results.price);
        this.myForm.controls["quantity"].setValue(results.quantity);
        this.myForm.controls["parent"].setValue(results.category.id);
        // this.myForm.controls["description"].setValue(results.description);
        this.selectedItem = results.category;
        this.selectedImage = `http://localhost:8080/${results.thumbnail}`;
        this.selectedGallery = [];
        results.gallery.forEach(img => {
          this.selectedGallery.push({
            src: `http://localhost:8080/${img}`,
            type: "remote"
          });
        });

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
    let updateThumbnail = false;
    let updateGallery = false;
    let localGalleryItems = [];

    console.log(this.myForm);

    const thumbnailData = new FormData();
    const galleryData = new FormData();
    let galleryObs: Observable<Object> = null;
    let thumbnailObs: Observable<Object> = null;
    let productObs: Observable<Object> = null;

    const name = this.myForm.controls["name"].value;
    const description = this.myForm.controls["description"].value;
    const quantity = this.myForm.controls["quantity"].value;
    const price = this.myForm.controls["price"].value;
    const code = this.myForm.controls["code"].value;
    const category = this.myForm.controls["parent"].value;
    let id = "";

    productObs = this.productService.ProductPut(
      {
        name: name,
        quantity: parseInt(quantity),
        price: parseInt(price),
        code: code,
        category: category
      },
      this.idParam
    );

    // console.log(`http://localhost:8080/${this.currentProduct.thumbnail}`);
    // console.log(this.selectedImage);
    if (
      this.selectedImage !==
      `http://localhost:8080/${this.currentProduct.thumbnail}`
    ) {
      console.log("Selected Image True");
      updateThumbnail = true;
      thumbnailData.append("banner", this.selectedFile, this.selectedFile.name);
    }

    if (this.gallery.length) {
      updateGallery = true;
      console.log(this.gallery);
      this.gallery.forEach(item => {
        galleryData.append("gallery[]", item, item.name);
      });
    }

    if (updateThumbnail) {
      thumbnailObs = this.productService.onPutTestMultipart(
        thumbnailData,
        this.idParam
      );
    }

    if (updateGallery) {
      galleryObs = this.productService.onPutTestMultipartGallery(
        galleryData,
        this.idParam
      );
    }

    const obs = [];

    if (galleryObs) {
      obs.push(galleryObs);
    }

    if (thumbnailObs) {
      obs.push(thumbnailObs);
    }

    if (productObs) {
      obs.push(productObs);
    }

    console.log(obs.length);
    Observable.forkJoin(...obs).subscribe(results => {
      this.router.navigate(["products", "browse"], {
        queryParams: { update: "true" }
      });
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

      this.loadProduct(this.idParam);
    });
  }

  onDeleteGalleryImage(gallery) {
    const itemIndex = this.selectedGallery.indexOf(gallery);

    this.selectedGallery.splice(itemIndex, 1);
    this.productService
      .ProductDeletegallery(this.idParam, itemIndex)
      .subscribe(result => {
        console.log(result);
      });
  }
}

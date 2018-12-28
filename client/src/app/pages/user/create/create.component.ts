import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CustomValidators } from "ng2-validation";
import { FileUploader } from "ng2-file-upload";
import { CategoryService, UserService } from "src/app/api/services";
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
  // courseObservable: Observable<CategoryVm[]>;
  roles: { label; value }[] = [
    { label: " أمين الصندوق", value: "Cashier" },
    { label: "المجمع", value: "Collecter" }
  ];

  selectedItem: CategoryVm = null;
  uploader: FileUploader = new FileUploader({
    isHTML5: true,
    url: URL
  });
  selectedImage: any = "";

  constructor(
    private readonly categoryService: CategoryService,
    private readonly router: Router,
    private readonly userService: UserService
  ) {
    const name = new FormControl("", Validators.required);
    const email = new FormControl("", [Validators.required, Validators.email]);
    const password = new FormControl("", [
      Validators.required,
      Validators.minLength(6)
    ]);
    const role = new FormControl("", Validators.required);
    // const rpassword = new FormControl("", [
    //   Validators.required,
    //   CustomValidators.equalTo(password)
    // ]);
    this.myForm = new FormGroup({
      name: name,
      email: email,
      password: password,
      role: role
    });

    this.myForm.controls.role.setValue(this.roles[this.roles.length - 1].value);

    // this.loadCategories();
    /*Basic validation end*/
  }

  loadCategories() {
    this.categoryAr = [];

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
    // this.categoryService.CategoryCreate();
    console.log(this.myForm);

    // console.log(this.myForm.controls.description.value);
    // console.log(this.myForm.controls.name.value);

    this.userService
      .UserRegister({
        name: this.myForm.controls.name.value,
        email: this.myForm.controls.email.value,
        password: this.myForm.controls.password.value,
        role: this.myForm.controls.role.value
      })
      .subscribe(results => {
        if (results.id) {
          this.router.navigate(["user", "browse"], {
            queryParams: { post: "true" }
          });
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

  logForm() {
    console.log(this.myForm);
  }
}

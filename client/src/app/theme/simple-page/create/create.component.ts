import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CustomValidators } from "ng2-validation";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"]
})
export class CreateComponent implements OnInit {
  myForm: FormGroup;
  submitted: boolean;

  constructor() {
    const name = new FormControl("", Validators.required);
    const password = new FormControl("", Validators.required);
    const gender = new FormControl("", Validators.required);
    const email = new FormControl("", [Validators.required, Validators.email]);

    const rpassword = new FormControl("", [
      Validators.required,
      CustomValidators.equalTo(password)
    ]);
    this.myForm = new FormGroup({
      name: name,
      email: email,
      password: password,
      rpassword: rpassword,
      gender: gender
    });
    /*Basic validation end*/
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.myForm);
  }

  ngOnInit() {}
}

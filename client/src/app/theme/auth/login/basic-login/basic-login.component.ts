import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "src/app/api/services";
import { Router } from "@angular/router";

@Component({
  selector: "app-basic-login",
  templateUrl: "./basic-login.component.html",
  styleUrls: ["./basic-login.component.scss"]
})
export class BasicLoginComponent implements OnInit {
  myForm: FormGroup;
  loading: boolean = false;
  loginError: String = "";

  constructor(
    private readonly _userService: UserService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    document.querySelector("body").setAttribute("themebg-pattern", "theme4");
    const email = new FormControl("", [Validators.required, Validators.email]);
    const password = new FormControl("", Validators.required);

    this.myForm = new FormGroup({
      email: email,
      password: password
    });
  }

  onSubmit() {
    console.log(this.myForm.value);
    this.loading = true;

    setTimeout(() => {
      this._userService
        .UserLogin({
          email: this.myForm.value.email,
          password: this.myForm.value.password
        })
        .subscribe(
          results => {
            console.log(results);
            this.loginError = "";
            this.loading = false;
            localStorage.setItem("token", results.token);
            console.log(localStorage.getItem("token"));

            this.router.navigate(["dashboard", "default"]);
          },
          error => {
            console.log(error);
            this.loginError = "البريد الإلكتروني أو كلمة السر خاطئة";
            this.loading = false;
          }
        );
    }, 5000);
  }
}

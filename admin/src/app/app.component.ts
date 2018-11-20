import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "admin";

  formGroup: FormGroup;

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl()
    });
  }

  onSubmit() {
    console.log(this.formGroup);
  }
}

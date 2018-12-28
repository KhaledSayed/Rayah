import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";
import { CustomValidators } from "ng2-validation";
import { FileUploader } from "ng2-file-upload";
import {
  CategoryService,
  UserService,
  CouponService,
  ProductService,
  OrderService
} from "src/app/api/services";
import { CategoryVm, ProductVm, UserVM, OrderVm } from "src/app/api/models";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpHeaders, HttpResponse } from "@angular/common/http";
import { IOption } from "ng-select";

const URL = "";
@Component({
  selector: "app-collector",
  templateUrl: "./collector.component.html",
  styleUrls: ["./collector.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectorComponent implements OnInit {
  idParam: string;
  simpleOption: IOption[];
  selectedOption = "1";
  productLoading: boolean = false;
  orderOptions: IOption[] = [
    { label: "Created", value: "Created" },
    { label: "Processing", value: "Processing" },
    { label: "Shipped", value: "Shipped" },
    { label: "Canceled", value: "Canceled" },
    { label: "Refunded", value: "Refunded" }
  ];
  currentProducts: { product: ProductVm; quantity: number }[] = [];
  simpleOption2: Array<IOption> = [
    {
      value: "1",
      label: "ikhaledsayed@gmail.com"
    },
    { value: "2", label: "admin@tbiss.com" }
  ];
  selectedOption2 = "1";
  currentOrder: OrderVm;
  myForm: FormGroup;
  submitted: boolean;
  selectedFile: File;
  selectedValue: string = "test";
  products: ProductVm[];
  loaded: boolean = false;
  productObservable: Observable<ProductVm[]>;
  selectedItem: ProductVm = null;
  uploader: FileUploader = new FileUploader({
    isHTML5: true,
    url: URL
  });
  selectedImage: any = "";
  items: FormArray;
  userObservable: Observable<UserVM[]>;

  constructor(
    private readonly _userService: UserService,
    private readonly _couponService: CouponService,
    private readonly _productService: ProductService,
    private readonly _orderService: OrderService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly activatedRouter: ActivatedRoute
  ) {
    const name = new FormControl("");
    const description = new FormControl("");
    const parent = new FormControl("");
    const code = new FormControl("");
    const note = new FormControl("");
    const address = new FormControl("", Validators.required);
    const total = new FormControl("");
    const user = new FormControl("");
    const status = new FormControl("");

    // const rpassword = new FormControl("", [
    //   Validators.required,
    //   CustomValidators.equalTo(password)
    // ]);
    this.myForm = new FormGroup({
      items: this.formBuilder.array([]),
      code: code,
      note: note,
      total: total,
      address: address,
      user: user,
      status: status
    });

    this.myForm.controls["total"].setValue("20");
    this.myForm.controls["total"].disable();
  }

  createItem(
    product = this.products[0],
    quantity = 1,
    status: string = "init"
  ): FormGroup {
    if (status === "init") {
      console.log(product.id);
      this.currentProducts.push({
        product: product,
        quantity: 1
      });
      console.log(this.calculateTotal());
      console.log(this.currentProducts);

      return this.formBuilder.group({
        product: product.id,
        quantity: 1,
        switch: false
      });
    } else if (status === "exist") {
      console.log(product.id);
      this.currentProducts.push({
        product: product,
        quantity: quantity
      });
      console.log(this.calculateTotal());
      console.log(this.currentProducts);

      return this.formBuilder.group({
        product: product.id,
        quantity: quantity,
        switch: false
      });
    }
  }

  addItem(product = this.products[0], quantity = 1, status = "init"): void {
    this.items = this.myForm.get("items") as FormArray;
    this.items.push(this.createItem(product, quantity, status));
  }

  removeItem(i): void {
    console.log(i);
    this.items = this.myForm.get("items") as FormArray;
    this.items.removeAt(i);
    this.currentProducts.splice(i, 1);
    console.log(this.calculateTotal());
  }

  loadProducts() {
    this.products = [];

    this.productObservable = this._productService.ProductGet({
      perPage: 100,
      page: 0,
      category: null
    });

    this.productObservable.subscribe(results => {
      this.products = [...results];
      console.log(this.products[0]);

      const controlArray = <FormArray>this.myForm.get("items");

      for (let i = 0; i < controlArray.length; i++) {
        controlArray.controls[i].get("product").setValue(this.products[0].name);
        controlArray.controls[i].get("quantity").setValue(1);
        this.myForm.controls["total"].setValue(this.products[0].price * 1);
      }
    });
  }

  onSubmit() {
    this.submitted = true;
    // this.categoryService.CategoryCreate();
    console.log(this.myForm);

    const items = this.myForm.get("items") as FormArray;
    let productParams = this.currentProducts.map(item => {
      return { id: item.product.id, quantity: item.quantity };
    });

    console.log(productParams);
    const note = this.myForm.value.note;
    const address = this.myForm.value.address;
    const status = this.myForm.controls.status.value;
    console.log("Status", status);
    this._orderService
      .OrderUpdate(this.currentOrder.id, {
        basket: productParams,
        user: this.currentOrder.user.id,
        note: note,
        address: address,
        coupon: this.currentOrder.coupon,
        status: "Cashier",
        brand: "5c016fbad49efb55811b82b2"
      })
      .subscribe(
        results => {
          if (results) {
            this.router.navigate(["orders", "browse"], {
              queryParams: { update: "true" }
            });
          }
        },
        error => {
          console.log(error);
        }
      );
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
    this.loadProducts();
    this.loadUsers();
    this.activatedRouter.params.subscribe(params => {
      const id = params.id;

      this.idParam = id;

      this.loadOrder(this.idParam);
    });
  }

  loadOrder(id) {
    this._orderService.findOne(id).subscribe(results => {
      console.log("Order");
      console.log("=================");
      console.log(results);
      this.currentOrder = results;
      console.log("=================");
      results.basket.forEach((item, index) => {
        this.addItem(item.product, item.quantity, "exist");
        this.currentProducts[index] = {
          product: item.product,
          quantity: item.quantity
        };
        this.myForm.controls.address.setValue(results.address);
        this.myForm.controls.note.setValue(results.note);
        this.myForm.controls.status.setValue(results.status);

        this.calculateTotal();
        console.log(this.currentProducts);
      });
    });
  }

  loadUsers() {
    this.userObservable = this._userService.UserGet({ page: 0, perPage: 100 });

    this.userObservable.subscribe(results => {
      this.myForm.controls.user.setValue(results[0].id);
    });
  }

  onChangeProduct(event) {
    console.log(event);
  }

  changeProduct(position) {
    // console.log("Event:" + event.target);
    // console.log("Position:" + position);
    const test = this.myForm.get("items") as FormArray;

    const item = test.controls[position].value;
    const currentProduct = this.findProduct(item.product);

    this.currentProducts[position] = {
      product: currentProduct,
      quantity: item.quantity
    };

    console.log(this.currentProducts);
    console.log(this.calculateTotal());
  }

  calculateTotal() {
    let sum = 0;
    this.currentProducts.forEach(item => {
      sum += item.product.price * item.quantity;
    });

    if (this.myForm) {
      this.myForm.controls["total"].setValue(sum.toString());
    }

    return sum;
  }

  findProduct(id): ProductVm {
    console.log(id);
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        return this.products[i];
      }
    }

    throw new Error("No Product in the array");
  }

  onQuantityChange(position) {
    console.log("Quantity #" + position + " Change");
    const test = this.myForm.get("items") as FormArray;
    this.currentProducts[position].quantity =
      test.controls[position].value.quantity;

    console.log(this.calculateTotal());
  }

  isFormClickable(): boolean {
    console.log("isFormDisabled()");
    let flag = true;
    const test = this.myForm.get("items") as FormArray;

    for (let i = 0; i < test.length; i++) {
      const item = test.controls[i].value;
      console.log(item);

      if (item.switch != true) {
        flag = false;
        break;
      }
    }

    console.log("flag", flag);

    console.log("=====================");
    return flag;
  }
}

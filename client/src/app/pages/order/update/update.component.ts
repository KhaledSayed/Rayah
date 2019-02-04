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
import { AuthService } from "src/app/auth.service";
import * as jsPDF from "jspdf";

const URL = "";
@Component({
  selector: "app-update",
  templateUrl: "./update.component.html",
  styleUrls: ["./update.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateComponent implements OnInit {
  idParam: string;
  currentUser: UserVM;
  currentGift: { name: string; school: string; class: string; avatar: string };
  simpleOption: IOption[];
  selectedOption = "1";
  productLoading: boolean = false;
  orderOptions: IOption[] = [
    { value: "New", label: "جديد" },
    { value: "Collecting", label: "جمع المنتجات" },
    { value: "Cashier", label: "أمام أمين الصندوق" },
    { value: "OnTheRun", label: "في طريقه للعميل" },
    { value: "RefundRequest", label: "طلب الاسترداد" },
    { value: "Refunded", label: "تم ردها" },
    { value: "Complete", label: "سلمت بنجاح" },
    { value: "Cancelled", label: "تم الإلغاء" }
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
    private readonly activatedRouter: ActivatedRoute,
    private readonly authService: AuthService
  ) {
    const description = new FormControl("");
    const parent = new FormControl("");
    const code = new FormControl("");
    const note = new FormControl("");
    const address = new FormControl("", Validators.required);
    const total = new FormControl("");
    const user = new FormControl("");
    const status = new FormControl("");
    const name = new FormControl("");
    const email = new FormControl("");
    const phone = new FormControl("");
    // const brand = new FormControl("", Validators.required);
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
      status: status,
      name: name,
      email: email,
      phone: phone
      // brand: brand
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
      // console.log(this.calculateTotal());
      // console.log(this.currentProducts);

      return this.formBuilder.group({
        product: product.id,
        quantity: 1
      });
    } else if (status === "exist") {
      // console.log("Exist", product.id);
      this.currentProducts.push({
        product: product,
        quantity: quantity
      });

      return this.formBuilder.group({
        product: product.id,
        quantity: quantity
      });
    }
  }

  addItem(product = this.products[0], quantity = 1, status = "init"): void {
    this.items = this.myForm.get("items") as FormArray;

    this.items.push(this.createItem(product, quantity, status));
    console.log("Form items Length", this.items.length);
    console.log("=============================");
  }

  updateOrder(basket) {
    const controlArray = <FormArray>this.myForm.get("items");
    let sum = 0;

    for (let i = 0; i < basket.length; i++) {
      controlArray.controls[i].get("product").setValue(basket[i].product.id);
      controlArray.controls[i].get("quantity").setValue(basket[i].quantity);
      sum += basket[i].price * basket[i].quantity;
    }
    console.log("UpdateOrder() =" + sum);
    this.calculateTotal();
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
      this.loadOrder(this.idParam);

      // console.log(this.products[0]);
    });
  }

  onSubmit() {
    this.submitted = true;
    // this.categoryService.CategoryCreate();
    console.log(this.myForm);

    const items = this.myForm.get("items") as FormArray;
    let productParams = this.myForm.value.items.map(item => {
      return { id: item.product, quantity: item.quantity };
    });

    console.log(productParams);
    const note = this.myForm.value.note;
    const address = this.myForm.value.address;
    const status = this.myForm.controls.status.value;
    // const brand = this.myForm.controls.brand.value;

    console.log("Status", status);
    this._orderService
      .OrderUpdate(this.currentOrder.id, {
        basket: productParams,
        user: this.currentOrder.user,
        note: note,
        address: address,
        coupon: this.currentOrder.coupon,
        status: status
        // brand: brand == null ? "5c016fccd49efb55811b82b4" : brand
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
    this.loadUsers();
    this.loadProducts();

    this.activatedRouter.params.subscribe(params => {
      const id = params.id;

      this.idParam = id;
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
        console.log("Basket #" + index, item);

        this.addItem(item.product, item.quantity, "exist");
      });

      this.myForm.controls.address.setValue(results.address);
      this.myForm.controls.note.setValue(results.note);
      this.myForm.controls.status.setValue(results.status);
      this.myForm.controls.name.setValue(results.user.name);
      this.myForm.controls.email.setValue(results.user.email);
      this.myForm.controls.phone.setValue(results.user.phone);
      this.currentUser = results.user;
      this.currentGift = results.gift;
      this.updateOrder(results.basket);
      this.calculateTotal();
      // this.currentUser = results.user;
      console.log("Current Products", this.currentProducts);
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

    this.calculateTotal();
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

    this.calculateTotal();
    console.log(this.calculateTotal());
  }

  createInv() {
    var doc = new jsPDF();
    doc.text(20, 20, "LRA7TK PDF");
    // doc.text(20, 30, "This is client-side Javascript, pumping out a PDF.");
    // doc.addPage();
    // doc.text(20, 20, "Do you like that?");

    this.currentOrder.basket.forEach((item, index) => {
      const ratio = index + 3;
      doc.text(
        20,
        ratio * 10,
        `${item.product.name}\t\t x${item.quantity}\t\t ${item.price} L.E`
      );
    });

    // Save the PDF
    doc.save("Test.pdf");
  }
}

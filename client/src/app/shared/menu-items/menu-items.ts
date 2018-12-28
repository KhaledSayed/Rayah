import { Injectable } from "@angular/core";
import { AuthService } from "../../../../src/app/auth.service";

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  short_label?: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

/**
 * {
    label: "الكوبونات",
    main: [
      {
        state: "coupons",
        short_label: "I",
        name: "الكوبونات",
        type: "sub",
        icon: "feather icon-file-minus",
        children: [
          {
            state: "browse",
            name: "تصفح",
            type: "link"
          },
          {
            state: "create",
            name: "إنشاء",
            type: "link"
          }
        ]
      }
    ]
  },
 */

const ADMIN_MENUITEMS = [
  {
    label: "الاقسام",
    main: [
      {
        state: "simple-page",
        short_label: "I",
        name: "الاقسام",
        type: "sub",
        icon: "feather icon-file-minus",
        children: [
          {
            state: "browse",
            name: "تصفح الأقسام",
            type: "link"
          },
          {
            state: "create",
            name: "إنشاء قسم جديد",
            type: "link"
          }
        ]
      }
    ]
  },

  {
    label: "العلامات التجارية",
    main: [
      {
        state: "brands",
        short_label: "I",
        name: "العلامات التجارية",
        type: "sub",
        icon: "feather icon-file-minus",
        children: [
          {
            state: "browse",
            name: "تصفح",
            type: "link"
          },
          {
            state: "create",
            name: "إنشاء",
            type: "link"
          }
        ]
      }
    ]
  },
  {
    label: "المنتجات",
    main: [
      {
        state: "products",
        short_label: "I",
        name: "المنتجات",
        type: "sub",
        icon: "feather icon-file-minus",
        children: [
          {
            state: "browse",
            name: "تصفح",
            type: "link"
          },
          {
            state: "create",
            name: "إضافة",
            type: "link"
          }
        ]
      }
    ]
  },
  {
    label: "طلبات العملاء",
    main: [
      {
        state: "orders",
        short_label: "I",
        name: "طلبات العملاء",
        type: "sub",
        icon: "feather icon-file-minus",
        children: [
          {
            state: "browse",
            name: "تصفح",
            type: "link"
          },
          {
            state: "create",
            name: "إضافة",
            type: "link"
          }
        ]
      }
    ]
  },
  {
    label: "إدارة الموظفين",
    main: [
      {
        state: "users",
        short_label: "I",
        name: "الموظفين",
        type: "sub",
        icon: "feather icon-file-minus",
        children: [
          {
            state: "browse",
            name: "تصفح",
            type: "link"
          },
          {
            state: "create",
            name: "إضافة",
            type: "link"
          }
        ]
      }
    ]
  }
];

const CASHIER_MENUITEMS = [
  {
    label: "طلبات العملاء",
    main: [
      {
        state: "orders",
        short_label: "I",
        name: "طلبات العملاء",
        type: "sub",
        icon: "feather icon-file-minus",
        children: [
          {
            state: "browse",
            name: "تصفح",
            type: "link"
          }
        ]
      }
    ]
  }
];

const COLLECTER_MENUITEMS = [
  {
    label: "طلبات العملاء",
    main: [
      {
        state: "orders",
        short_label: "I",
        name: "طلبات العملاء",
        type: "sub",
        icon: "feather icon-file-minus",
        children: [
          {
            state: "browse",
            name: "تصفح",
            type: "link"
          },
          {
            state: "create",
            name: "إضافة",
            type: "link"
          }
        ]
      }
    ]
  }
];

@Injectable()
export class MenuItems {
  MENU = null;
  constructor(private readonly authService: AuthService) {
    console.log(authService.getType() + " Menu Loaded");

    switch (authService.getType()) {
      case "Admin":
        this.MENU = ADMIN_MENUITEMS;
        break;
      case "Cashier":
        this.MENU = CASHIER_MENUITEMS;
        break;
      case "Collector":
        this.MENU = COLLECTER_MENUITEMS;
        break;
    }
  }

  getAll(): Menu[] {
    return this.MENU;
  }
}

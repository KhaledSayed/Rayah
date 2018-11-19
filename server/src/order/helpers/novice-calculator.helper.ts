import { ProductItem } from 'order/models/product-item.model';
import { Coupon } from 'coupon/models/coupon.model';
import { CouponLevel } from 'coupon/models/coupon-level.enum';

export class NoviceHelper {
  static calculateTotal(productItems: ProductItem[]): number {
    let total = 0;
    for (let i = 0; i < productItems.length; i++) {
      const item = productItems[i];

      total += item.quantity * item.price;
    }
    return total;
  }

  static applyCoupon(total: number, coupon: Coupon): number {
    if (!coupon) {
      return total;
    }

    if (coupon.minTotal <= total && coupon.maxTotal >= total) {
      if (CouponLevel.Fixed) {
        total -= coupon.value;
      } else {
        let discount: number = total * (coupon.value / 100);
        total -= discount;
      }

      return total;
    }

    return total;
  }
}

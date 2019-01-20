"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coupon_level_enum_1 = require("../../coupon/models/coupon-level.enum");
class NoviceHelper {
    static calculateTotal(productItems) {
        let total = 0;
        for (let i = 0; i < productItems.length; i++) {
            const item = productItems[i];
            total += item.quantity * item.price;
        }
        return total;
    }
    static applyCoupon(total, coupon) {
        if (!coupon) {
            return total;
        }
        if (coupon.minTotal <= total && coupon.maxTotal >= total) {
            if (coupon_level_enum_1.CouponLevel.Fixed) {
                total -= coupon.value;
            }
            else {
                let discount = total * (coupon.value / 100);
                total -= discount;
            }
            return total;
        }
        return total;
    }
}
exports.NoviceHelper = NoviceHelper;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9vcmRlci9oZWxwZXJzL25vdmljZS1jYWxjdWxhdG9yLmhlbHBlci50cyIsInNvdXJjZXMiOlsiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9vcmRlci9oZWxwZXJzL25vdmljZS1jYWxjdWxhdG9yLmhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLDZFQUFvRTtBQUVwRSxNQUFhLFlBQVk7SUFDdkIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxZQUEyQjtRQUMvQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM1QyxNQUFNLElBQUksR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFN0IsS0FBSyxJQUFJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUNyQztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBYSxFQUFFLE1BQWM7UUFDOUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNYLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxJQUFJLE1BQU0sQ0FBQyxRQUFRLElBQUksS0FBSyxJQUFJLE1BQU0sQ0FBQyxRQUFRLElBQUksS0FBSyxFQUFFO1lBQ3hELElBQUksK0JBQVcsQ0FBQyxLQUFLLEVBQUU7Z0JBQ3JCLEtBQUssSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDO2FBQ3ZCO2lCQUFNO2dCQUNMLElBQUksUUFBUSxHQUFXLEtBQUssR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUM7Z0JBQ3BELEtBQUssSUFBSSxRQUFRLENBQUM7YUFDbkI7WUFFRCxPQUFPLEtBQUssQ0FBQztTQUNkO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0NBQ0Y7QUE3QkQsb0NBNkJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJvZHVjdEl0ZW0gfSBmcm9tICcuLi8uLi9vcmRlci9tb2RlbHMvcHJvZHVjdC1pdGVtLm1vZGVsJztcbmltcG9ydCB7IENvdXBvbiB9IGZyb20gJy4uLy4uL2NvdXBvbi9tb2RlbHMvY291cG9uLm1vZGVsJztcbmltcG9ydCB7IENvdXBvbkxldmVsIH0gZnJvbSAnLi4vLi4vY291cG9uL21vZGVscy9jb3Vwb24tbGV2ZWwuZW51bSc7XG5cbmV4cG9ydCBjbGFzcyBOb3ZpY2VIZWxwZXIge1xuICBzdGF0aWMgY2FsY3VsYXRlVG90YWwocHJvZHVjdEl0ZW1zOiBQcm9kdWN0SXRlbVtdKTogbnVtYmVyIHtcbiAgICBsZXQgdG90YWwgPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvZHVjdEl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBpdGVtID0gcHJvZHVjdEl0ZW1zW2ldO1xuXG4gICAgICB0b3RhbCArPSBpdGVtLnF1YW50aXR5ICogaXRlbS5wcmljZTtcbiAgICB9XG4gICAgcmV0dXJuIHRvdGFsO1xuICB9XG5cbiAgc3RhdGljIGFwcGx5Q291cG9uKHRvdGFsOiBudW1iZXIsIGNvdXBvbjogQ291cG9uKTogbnVtYmVyIHtcbiAgICBpZiAoIWNvdXBvbikge1xuICAgICAgcmV0dXJuIHRvdGFsO1xuICAgIH1cblxuICAgIGlmIChjb3Vwb24ubWluVG90YWwgPD0gdG90YWwgJiYgY291cG9uLm1heFRvdGFsID49IHRvdGFsKSB7XG4gICAgICBpZiAoQ291cG9uTGV2ZWwuRml4ZWQpIHtcbiAgICAgICAgdG90YWwgLT0gY291cG9uLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGRpc2NvdW50OiBudW1iZXIgPSB0b3RhbCAqIChjb3Vwb24udmFsdWUgLyAxMDApO1xuICAgICAgICB0b3RhbCAtPSBkaXNjb3VudDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRvdGFsO1xuICAgIH1cblxuICAgIHJldHVybiB0b3RhbDtcbiAgfVxufVxuIl19
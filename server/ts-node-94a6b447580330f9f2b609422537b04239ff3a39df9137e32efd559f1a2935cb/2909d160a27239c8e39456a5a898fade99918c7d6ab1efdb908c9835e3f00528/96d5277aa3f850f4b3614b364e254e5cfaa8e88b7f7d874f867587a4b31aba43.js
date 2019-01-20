"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const coupon_level_enum_1 = require("../../../coupon/models/coupon-level.enum");
function IsPercentage(property, validationOptions) {
    return function (object, propertyName) {
        class_validator_1.registerDecorator({
            name: 'isPercentage',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = args.object[relatedPropertyName];
                    if (relatedValue === coupon_level_enum_1.CouponLevel.Percentage) {
                        return value > 0 && value <= 100;
                    }
                    else {
                        return true;
                    }
                },
            },
        });
    };
}
exports.IsPercentage = IsPercentage;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9zaGFyZWQvdmFsaWRhdG9ycy9jb3Vwb25zL3BlcmNlbnRhZ2UudmFsaWRhdG9ycy50cyIsInNvdXJjZXMiOlsiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9zaGFyZWQvdmFsaWRhdG9ycy9jb3Vwb25zL3BlcmNlbnRhZ2UudmFsaWRhdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFEQUl5QjtBQUN6QixnRkFBdUU7QUFFdkUsU0FBZ0IsWUFBWSxDQUMxQixRQUFnQixFQUNoQixpQkFBcUM7SUFFckMsT0FBTyxVQUFTLE1BQWMsRUFBRSxZQUFvQjtRQUNsRCxtQ0FBaUIsQ0FBQztZQUNoQixJQUFJLEVBQUUsY0FBYztZQUNwQixNQUFNLEVBQUUsTUFBTSxDQUFDLFdBQVc7WUFDMUIsWUFBWSxFQUFFLFlBQVk7WUFDMUIsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ3ZCLE9BQU8sRUFBRSxpQkFBaUI7WUFDMUIsU0FBUyxFQUFFO2dCQUNULFFBQVEsQ0FBQyxLQUFVLEVBQUUsSUFBeUI7b0JBQzVDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7b0JBQy9DLE1BQU0sWUFBWSxHQUFJLElBQUksQ0FBQyxNQUFjLENBQUMsbUJBQW1CLENBQUMsQ0FBQztvQkFDL0QsSUFBSSxZQUFZLEtBQUssK0JBQVcsQ0FBQyxVQUFVLEVBQUU7d0JBQzNDLE9BQU8sS0FBSyxHQUFHLENBQUMsSUFBSSxLQUFLLElBQUksR0FBRyxDQUFDO3FCQUNsQzt5QkFBTTt3QkFDTCxPQUFPLElBQUksQ0FBQztxQkFDYjtnQkFDSCxDQUFDO2FBQ0Y7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUM7QUFDSixDQUFDO0FBeEJELG9DQXdCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIHJlZ2lzdGVyRGVjb3JhdG9yLFxuICBWYWxpZGF0aW9uT3B0aW9ucyxcbiAgVmFsaWRhdGlvbkFyZ3VtZW50cyxcbn0gZnJvbSAnY2xhc3MtdmFsaWRhdG9yJztcbmltcG9ydCB7IENvdXBvbkxldmVsIH0gZnJvbSAnLi4vLi4vLi4vY291cG9uL21vZGVscy9jb3Vwb24tbGV2ZWwuZW51bSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBJc1BlcmNlbnRhZ2UoXG4gIHByb3BlcnR5OiBzdHJpbmcsXG4gIHZhbGlkYXRpb25PcHRpb25zPzogVmFsaWRhdGlvbk9wdGlvbnMsXG4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdDogT2JqZWN0LCBwcm9wZXJ0eU5hbWU6IHN0cmluZykge1xuICAgIHJlZ2lzdGVyRGVjb3JhdG9yKHtcbiAgICAgIG5hbWU6ICdpc1BlcmNlbnRhZ2UnLFxuICAgICAgdGFyZ2V0OiBvYmplY3QuY29uc3RydWN0b3IsXG4gICAgICBwcm9wZXJ0eU5hbWU6IHByb3BlcnR5TmFtZSxcbiAgICAgIGNvbnN0cmFpbnRzOiBbcHJvcGVydHldLFxuICAgICAgb3B0aW9uczogdmFsaWRhdGlvbk9wdGlvbnMsXG4gICAgICB2YWxpZGF0b3I6IHtcbiAgICAgICAgdmFsaWRhdGUodmFsdWU6IGFueSwgYXJnczogVmFsaWRhdGlvbkFyZ3VtZW50cykge1xuICAgICAgICAgIGNvbnN0IFtyZWxhdGVkUHJvcGVydHlOYW1lXSA9IGFyZ3MuY29uc3RyYWludHM7XG4gICAgICAgICAgY29uc3QgcmVsYXRlZFZhbHVlID0gKGFyZ3Mub2JqZWN0IGFzIGFueSlbcmVsYXRlZFByb3BlcnR5TmFtZV07XG4gICAgICAgICAgaWYgKHJlbGF0ZWRWYWx1ZSA9PT0gQ291cG9uTGV2ZWwuUGVyY2VudGFnZSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlID4gMCAmJiB2YWx1ZSA8PSAxMDA7IC8vIHlvdSBjYW4gcmV0dXJuIGEgUHJvbWlzZTxib29sZWFuPiBoZXJlIGFzIHdlbGwsIGlmIHlvdSB3YW50IHRvIG1ha2UgYXN5bmMgdmFsaWRhdGlvblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pO1xuICB9O1xufVxuIl19
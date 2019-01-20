"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const moment = require("moment");
function IsBefore(property, validationOptions) {
    return function (object, propertyName) {
        class_validator_1.registerDecorator({
            name: 'isBefore',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = args.object[relatedPropertyName];
                    return (typeof value === 'string' &&
                        typeof relatedValue === 'string' &&
                        moment(value).isBefore(relatedValue));
                },
            },
        });
    };
}
exports.IsBefore = IsBefore;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9zaGFyZWQvdmFsaWRhdG9ycy9jb3Vwb25zL3RpbWUtdmFsaWRhdG9ycy50cyIsInNvdXJjZXMiOlsiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9zaGFyZWQvdmFsaWRhdG9ycy9jb3Vwb25zL3RpbWUtdmFsaWRhdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFEQUl5QjtBQUV6QixpQ0FBaUM7QUFFakMsU0FBZ0IsUUFBUSxDQUN0QixRQUFnQixFQUNoQixpQkFBcUM7SUFFckMsT0FBTyxVQUFTLE1BQWMsRUFBRSxZQUFvQjtRQUNsRCxtQ0FBaUIsQ0FBQztZQUNoQixJQUFJLEVBQUUsVUFBVTtZQUNoQixNQUFNLEVBQUUsTUFBTSxDQUFDLFdBQVc7WUFDMUIsWUFBWSxFQUFFLFlBQVk7WUFDMUIsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ3ZCLE9BQU8sRUFBRSxpQkFBaUI7WUFDMUIsU0FBUyxFQUFFO2dCQUNULFFBQVEsQ0FBQyxLQUFVLEVBQUUsSUFBeUI7b0JBQzVDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7b0JBQy9DLE1BQU0sWUFBWSxHQUFJLElBQUksQ0FBQyxNQUFjLENBQUMsbUJBQW1CLENBQUMsQ0FBQztvQkFFL0QsT0FBTyxDQUNMLE9BQU8sS0FBSyxLQUFLLFFBQVE7d0JBQ3pCLE9BQU8sWUFBWSxLQUFLLFFBQVE7d0JBQ2hDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQ3JDLENBQUM7Z0JBQ0osQ0FBQzthQUNGO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQXpCRCw0QkF5QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICByZWdpc3RlckRlY29yYXRvcixcbiAgVmFsaWRhdGlvbk9wdGlvbnMsXG4gIFZhbGlkYXRpb25Bcmd1bWVudHMsXG59IGZyb20gJ2NsYXNzLXZhbGlkYXRvcic7XG5cbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xuXG5leHBvcnQgZnVuY3Rpb24gSXNCZWZvcmUoXG4gIHByb3BlcnR5OiBzdHJpbmcsXG4gIHZhbGlkYXRpb25PcHRpb25zPzogVmFsaWRhdGlvbk9wdGlvbnMsXG4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdDogT2JqZWN0LCBwcm9wZXJ0eU5hbWU6IHN0cmluZykge1xuICAgIHJlZ2lzdGVyRGVjb3JhdG9yKHtcbiAgICAgIG5hbWU6ICdpc0JlZm9yZScsXG4gICAgICB0YXJnZXQ6IG9iamVjdC5jb25zdHJ1Y3RvcixcbiAgICAgIHByb3BlcnR5TmFtZTogcHJvcGVydHlOYW1lLFxuICAgICAgY29uc3RyYWludHM6IFtwcm9wZXJ0eV0sXG4gICAgICBvcHRpb25zOiB2YWxpZGF0aW9uT3B0aW9ucyxcbiAgICAgIHZhbGlkYXRvcjoge1xuICAgICAgICB2YWxpZGF0ZSh2YWx1ZTogYW55LCBhcmdzOiBWYWxpZGF0aW9uQXJndW1lbnRzKSB7XG4gICAgICAgICAgY29uc3QgW3JlbGF0ZWRQcm9wZXJ0eU5hbWVdID0gYXJncy5jb25zdHJhaW50cztcbiAgICAgICAgICBjb25zdCByZWxhdGVkVmFsdWUgPSAoYXJncy5vYmplY3QgYXMgYW55KVtyZWxhdGVkUHJvcGVydHlOYW1lXTtcblxuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmXG4gICAgICAgICAgICB0eXBlb2YgcmVsYXRlZFZhbHVlID09PSAnc3RyaW5nJyAmJlxuICAgICAgICAgICAgbW9tZW50KHZhbHVlKS5pc0JlZm9yZShyZWxhdGVkVmFsdWUpXG4gICAgICAgICAgKTsgLy8geW91IGNhbiByZXR1cm4gYSBQcm9taXNlPGJvb2xlYW4+IGhlcmUgYXMgd2VsbCwgaWYgeW91IHdhbnQgdG8gbWFrZSBhc3luYyB2YWxpZGF0aW9uXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pO1xuICB9O1xufVxuIl19
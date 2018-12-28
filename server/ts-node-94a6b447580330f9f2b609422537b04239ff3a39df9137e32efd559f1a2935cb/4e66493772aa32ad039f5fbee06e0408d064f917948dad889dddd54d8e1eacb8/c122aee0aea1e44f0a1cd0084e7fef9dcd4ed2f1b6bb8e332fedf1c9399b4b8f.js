"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
function BetweenMinAndMaximum(property, operating, validationOptions) {
    return function (object, propertyName) {
        class_validator_1.registerDecorator({
            name: 'minAndMax',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = args.object[relatedPropertyName];
                    if (operating === 'gt') {
                        return value >= relatedValue;
                    }
                    else {
                        return value <= relatedValue;
                    }
                },
            },
        });
    };
}
exports.BetweenMinAndMaximum = BetweenMinAndMaximum;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy9zaGFyZWQvdmFsaWRhdG9ycy9jb3Vwb25zL21pbi1tYXgudmFsaWRhdG9yLnRzIiwic291cmNlcyI6WyIvaG9tZS9SYXlhaC9zZXJ2ZXIvc3JjL3NoYXJlZC92YWxpZGF0b3JzL2NvdXBvbnMvbWluLW1heC52YWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxREFJeUI7QUFFekIsU0FBZ0Isb0JBQW9CLENBQ2xDLFFBQWdCLEVBQ2hCLFNBQWlCLEVBQ2pCLGlCQUFxQztJQUVyQyxPQUFPLFVBQVMsTUFBYyxFQUFFLFlBQW9CO1FBQ2xELG1DQUFpQixDQUFDO1lBQ2hCLElBQUksRUFBRSxXQUFXO1lBQ2pCLE1BQU0sRUFBRSxNQUFNLENBQUMsV0FBVztZQUMxQixZQUFZLEVBQUUsWUFBWTtZQUMxQixXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUM7WUFDdkIsT0FBTyxFQUFFLGlCQUFpQjtZQUMxQixTQUFTLEVBQUU7Z0JBQ1QsUUFBUSxDQUFDLEtBQVUsRUFBRSxJQUF5QjtvQkFDNUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztvQkFDL0MsTUFBTSxZQUFZLEdBQUksSUFBSSxDQUFDLE1BQWMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO29CQUUvRCxJQUFJLFNBQVMsS0FBSyxJQUFJLEVBQUU7d0JBQ3RCLE9BQU8sS0FBSyxJQUFJLFlBQVksQ0FBQztxQkFDOUI7eUJBQU07d0JBQ0wsT0FBTyxLQUFLLElBQUksWUFBWSxDQUFDO3FCQUM5QjtnQkFDSCxDQUFDO2FBQ0Y7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUM7QUFDSixDQUFDO0FBMUJELG9EQTBCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIHJlZ2lzdGVyRGVjb3JhdG9yLFxuICBWYWxpZGF0aW9uT3B0aW9ucyxcbiAgVmFsaWRhdGlvbkFyZ3VtZW50cyxcbn0gZnJvbSAnY2xhc3MtdmFsaWRhdG9yJztcblxuZXhwb3J0IGZ1bmN0aW9uIEJldHdlZW5NaW5BbmRNYXhpbXVtKFxuICBwcm9wZXJ0eTogc3RyaW5nLFxuICBvcGVyYXRpbmc6IHN0cmluZyxcbiAgdmFsaWRhdGlvbk9wdGlvbnM/OiBWYWxpZGF0aW9uT3B0aW9ucyxcbikge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0OiBPYmplY3QsIHByb3BlcnR5TmFtZTogc3RyaW5nKSB7XG4gICAgcmVnaXN0ZXJEZWNvcmF0b3Ioe1xuICAgICAgbmFtZTogJ21pbkFuZE1heCcsXG4gICAgICB0YXJnZXQ6IG9iamVjdC5jb25zdHJ1Y3RvcixcbiAgICAgIHByb3BlcnR5TmFtZTogcHJvcGVydHlOYW1lLFxuICAgICAgY29uc3RyYWludHM6IFtwcm9wZXJ0eV0sXG4gICAgICBvcHRpb25zOiB2YWxpZGF0aW9uT3B0aW9ucyxcbiAgICAgIHZhbGlkYXRvcjoge1xuICAgICAgICB2YWxpZGF0ZSh2YWx1ZTogYW55LCBhcmdzOiBWYWxpZGF0aW9uQXJndW1lbnRzKSB7XG4gICAgICAgICAgY29uc3QgW3JlbGF0ZWRQcm9wZXJ0eU5hbWVdID0gYXJncy5jb25zdHJhaW50cztcbiAgICAgICAgICBjb25zdCByZWxhdGVkVmFsdWUgPSAoYXJncy5vYmplY3QgYXMgYW55KVtyZWxhdGVkUHJvcGVydHlOYW1lXTtcblxuICAgICAgICAgIGlmIChvcGVyYXRpbmcgPT09ICdndCcpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSA+PSByZWxhdGVkVmFsdWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSA8PSByZWxhdGVkVmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KTtcbiAgfTtcbn1cbiJdfQ==
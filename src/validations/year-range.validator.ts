import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsYearInRange(
  minYear: number,
  maxYear: number,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isYearInRange',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [minYear, maxYear],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [min, max] = args.constraints;
          const year = parseInt(value);
          return typeof value === 'string' && /^\d{4}$/.test(value) && year >= min && year <= max;
        },
        defaultMessage(args: ValidationArguments) {
          const [min, max] = args.constraints;
          return `El año debe estar entre ${min} y ${max}`;
        },
      },
    });
  };
}

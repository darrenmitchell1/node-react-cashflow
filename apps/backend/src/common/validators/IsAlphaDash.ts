import { isAlphanumeric, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: 'IsAlphaDash', async: false })
export class IsAlphaDash implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return isAlphanumeric(text.replace(/[-_]/g, '')); // for async validations you must return a Promise<boolean> here

  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'Text ($value) is too short or too long!';
  }
}
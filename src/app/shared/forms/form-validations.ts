import { FormControl, FormGroup } from "@angular/forms";
import { Utils } from "../utils/utils";

export class FormValidations {

  static getErrorTranslationKey(error: any) {
    try {
      const keys = Object.keys(error);
      return `web.forms.errors.${keys[0]}`;
    } catch (e) {
      return 'web.forms.errors.generic';
    }
  }

  static equalsTo(otherField: string) {
    const validator = (formControl: FormControl) => {
      if (otherField == null) {
        throw new Error('It is necessary to inform a field');
      }
      if (!formControl.root || !(<FormGroup>formControl.root).controls) {
        return null;
      }
      const field = (<FormGroup>formControl.root).get(otherField);
      if (!field) {
        throw new Error('It is necessary to inform a valid field')
      }
      if (field.value !== formControl.value) {
        return { equalsTo: otherField }
      }
      return null;
    }
    return validator;
  }

  static hexadecimalColor() {
    const validator = (formControl: FormControl) => {
      if (!formControl.root || !(<FormGroup>formControl.root).controls) {
        return null;
      }
      const value = formControl.value;
      if (!value) {
        return null;
      }
      if (!Utils.isValidHexadecimalColor(value)) {
        return "Invalid hexadecimal color";
      }
      return null
    }
    return validator;
  }

}

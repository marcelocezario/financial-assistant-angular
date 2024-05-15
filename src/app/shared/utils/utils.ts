const corHexRegExp = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

export class Utils {

  static isValidHexadecimalColor(color: string): boolean {
    return corHexRegExp.test(color);
  }

}

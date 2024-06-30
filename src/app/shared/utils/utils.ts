const corHexRegExp = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

export class Utils {

  static isValidHexadecimalColor(color: string): boolean {
    return corHexRegExp.test(color);
  }

  static generateRandomHexadecimalColor(): string {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const pad = (s: string) => (s.length < 2) ? "0" + s : s;
    const hexadecimal = "#" + pad(red.toString(16)) + pad(green.toString(16)) + pad(blue.toString(16));
    return hexadecimal;
  }

  static formatDateTimeForInput(localDateTime: string | undefined): string {
    if (!localDateTime) {
      return ''
    }
    let formattedDateTime = localDateTime.split('.')[0]
    let dateTimeParts = formattedDateTime.split(':')
    if (dateTimeParts.length === 3) {
      dateTimeParts.pop();
      formattedDateTime = dateTimeParts.join(':');
    }
    return formattedDateTime;
  }

}

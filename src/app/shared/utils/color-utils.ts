export class ColorUtils {

  static convertHexadecimalToRgb(hex: string): number[] | null {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
  }

  static getContrastingColor(color: string): string {
    const luminance = ColorUtils._getLuminance(color);
    const lightColor = '#F5F5F5';
    const darkColor = '#263238';
    return luminance > 0.5 ? darkColor : lightColor;
  }

  private static _getLuminance(color: string): number {
    const rgb = this.convertHexadecimalToRgb(color);
    if (!rgb) return 0;
    const [r, g, b] = rgb.map((c) => {
      c /= 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

}

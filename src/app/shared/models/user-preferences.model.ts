import { LANGUAGES } from "../language/languages.config";
import { ThemeOptions } from "../theme/theme-options.type";

export interface UserPreferences {
  keepLoggedIn?: boolean;
  language?: typeof LANGUAGES[number];
  theme?: ThemeOptions;
}

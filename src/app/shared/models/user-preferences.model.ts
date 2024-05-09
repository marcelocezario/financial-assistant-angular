import { LANGUAGES } from "../language/languages.config";

export interface UserPreferences {
  keepLoggedIn?: boolean;
  language?: typeof LANGUAGES[number];
}

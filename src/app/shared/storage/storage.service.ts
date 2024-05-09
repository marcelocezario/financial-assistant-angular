import { Injectable } from '@angular/core';
import { STORAGE_KEYS } from './storage-keys.config';
import { LANGUAGES } from '../language/languages.config';
import { UserPreferences } from '../models/user-preferences.model';
import { LocalUser } from '../models/local-user.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage;
  private _uniqueLocalStorage: string[] = [STORAGE_KEYS.userPreferences];
  private _uniqueSessionStorage: string[] = [STORAGE_KEYS.localUser];

  constructor() {
    this._storage = this.getKeepLoggedIn() ? localStorage : sessionStorage;
  }

  private _getStorage(key: string | undefined = undefined): Storage {
    if (!key) {
      return this._storage;
    } else if (this._uniqueLocalStorage.indexOf(key) >= 0) {
      return localStorage;
    } else if (this._uniqueSessionStorage.indexOf(key) >= 0) {
      return sessionStorage;
    }
    return this._storage;
  }

  private _setUserPreferences(userPreferences: UserPreferences | null): void {
    if (userPreferences === null) {
      this.removeItem(STORAGE_KEYS.userPreferences);
    } else {
      this.setItem(STORAGE_KEYS.userPreferences, JSON.stringify(userPreferences));
    }
  }

  setKeepLoggedIn(keepLoggedIn: boolean): void {
    const userPreferences = this.getUserPreferences() || {};
    userPreferences.keepLoggedIn = keepLoggedIn;
    this._setUserPreferences(userPreferences);
    if (keepLoggedIn) {
      this._storage = localStorage;
    }
    else {
      this._storage = sessionStorage;
    }
  }

  setItem(key: string, value: any): void {
    const storage = this._getStorage(key);
    storage.setItem(key, value);
  }

  setUserLanguage(language: typeof LANGUAGES[number]): void {
    const userPreferences = this.getUserPreferences() || {};
    userPreferences.language = language;
    this._setUserPreferences(userPreferences);
  }

  getUserLanguage(): typeof LANGUAGES[number] | null {
    const userPreferences = this.getUserPreferences();
    return userPreferences?.language ?? null;
  }

  getItem(key: string): any {
    const storage = this._getStorage(key);
    const item = storage.getItem(key);
    try {
      return item ? JSON.parse(item) : null;
    } catch (e) {
      return item;
    }
  }

  getKeepLoggedIn(): boolean {
    const userPreferences = this.getUserPreferences();
    if (userPreferences?.keepLoggedIn) {
      return userPreferences.keepLoggedIn;
    }
    return false;
  }

  getUserPreferences(): UserPreferences | null {
    const userPreferences = this.getItem(STORAGE_KEYS.userPreferences);
    try {
      return (userPreferences == null) ? null : JSON.parse(userPreferences);
    } catch (e) {
      return userPreferences;
    }
  }

  removeItem(key: string): void {
    this._getStorage(key).removeItem(key);
  }

  setLocalUser(localUser: LocalUser | null) {
    if (localUser == null) {
      this.removeItem(STORAGE_KEYS.localUser);
    } else {
      this.setItem(STORAGE_KEYS.localUser, JSON.stringify(localUser));
    }
  }

  setUserNickname(nickname: string | undefined) {
    const localUser = this.getLocalUser() || {};
    localUser.nickname = nickname;
    this.setLocalUser(localUser);
  }

  getLocalUser(): LocalUser {
    const localUser = this.getItem(STORAGE_KEYS.localUser);
    try {
      return (localUser == null) ? null : JSON.parse(localUser);
    } catch (e) {
      return localUser;
    }
  }

  getUserId(): string | null {
    return this.getLocalUser()?.userId ?? null;
  }

  getUserNickname(): string | null {
    return this.getLocalUser()?.nickname ?? null;
  }

  setUserPreferenceAtribute(key: keyof UserPreferences, value: any) {
    let userPreferences = this.getUserPreferences();
    if (!userPreferences) {
      userPreferences = {};
    }
    userPreferences[key] = value;
    this._setUserPreferences(userPreferences);
  }

  clearStorage() {
    const userPreferences = this.getUserPreferences();
    localStorage.clear();
    sessionStorage.clear();
    this._setUserPreferences(userPreferences);
  }

  setRefreshToken(token: string): void {
    this.setItem(STORAGE_KEYS.refreshToken, token);
  }

  getRefreshToken(): string | null {
    return this.getItem(STORAGE_KEYS.refreshToken);
  }
}

import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  // Set item in local storage
  set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Get item from local storage
  get(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  // Remove item from local storage
  remove(key: string): void {
    localStorage.removeItem(key);
  }

  add(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

}

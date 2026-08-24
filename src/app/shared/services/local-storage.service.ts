import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import * as LZString from 'lz-string';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  private readonly SECRET_KEY = 'myncoreprouisupersecretkey';

  constructor() { }

  setItem(key: string, value: any): void {
    const compressedValue = LZString.compressToUTF16(JSON.stringify(value));
    const encryptedValue = CryptoJS.AES.encrypt(compressedValue, this.SECRET_KEY).toString();
    localStorage.setItem(key, encryptedValue);
  }

  getItem(key: string): any {
    const encryptedValue = localStorage.getItem(key);
    if (encryptedValue) {
      const bytes = CryptoJS.AES.decrypt(encryptedValue, this.SECRET_KEY);
      try {
        const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
        const parsedData = JSON.parse(LZString.decompressFromUTF16(decryptedValue));
        if (Array.isArray(parsedData)) {
          return parsedData.filter(item => item != null);
        }
        return parsedData;
      } catch (jsonError) {
        console.error('Error parsing JSON data:', jsonError);
      }
    }
    return null;
  }
}
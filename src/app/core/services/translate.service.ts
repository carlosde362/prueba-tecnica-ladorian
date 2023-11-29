import { Injectable } from '@angular/core';
import {TranslateService as ngTranslate} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private readonly DEFAULT_LANG = 'es';
  constructor(private translate: ngTranslate) {
    this.setAppLanguage();
  }

  private setAppLanguage(): void {
    this.translate.setDefaultLang(this.DEFAULT_LANG);
    this.translate.use(this.translate.getBrowserLang() || this.DEFAULT_LANG);
  }

  changeLang(lang: string = this.DEFAULT_LANG): void {
    this.translate.use(lang);
  }
}

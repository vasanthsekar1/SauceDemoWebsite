import { Page } from '@playwright/test';
import { LoginPage } from './LoginPage';

export class PageManager {
  private page: Page;
  private _loginPage?: LoginPage;

  constructor(page: Page) {
    this.page = page;
  }

  get loginPage() {
    if (!this._loginPage) this._loginPage = new LoginPage(this.page);
    return this._loginPage;
  }
}

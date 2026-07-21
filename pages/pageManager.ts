import { Page } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { InventoryPage } from './InventoryPage';

export class PageManager {
  private page: Page;
  private _loginPage?: LoginPage;
  private _inventoryPage?: InventoryPage;

  constructor(page: Page) {
    this.page = page;
  }

  get loginPage() {
    if (!this._loginPage) this._loginPage = new LoginPage(this.page);
    return this._loginPage;
  }

  get inventoryPage() {
    if (!this._inventoryPage) this._inventoryPage = new InventoryPage(this.page);
    return this._inventoryPage;
  }
}

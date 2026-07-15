import { Page } from "@playwright/test";
import { LoginPage } from "./LoginPage";
import { InventoryPage } from "./InventoryPage";

export class PageManager {
  private _loginPage?: LoginPage;
  private _inventoryPage?: InventoryPage;

  constructor(private readonly page: Page) {}

  get loginPage(): LoginPage {
    return this._loginPage ??= new LoginPage(this.page);
  }

  get inventoryPage(): InventoryPage {
    return this._inventoryPage ??= new InventoryPage(this.page);
  }
}
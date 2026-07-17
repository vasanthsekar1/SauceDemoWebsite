import { expect, Locator, Page } from "@playwright/test";

export class InventoryPage {
  private page: Page;
  private readonly menuButton: Locator;
  private readonly closeButton: Locator;
  private readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    // AKB metadata: BTN_REACTBURGERMENUBTN id = 'react-burger-menu-btn'
    this.menuButton = this.page.locator('#react-burger-menu-btn');
    // AKB metadata: BTN_REACTBURGERCROSSBTN id = 'react-burger-cross-btn'
    this.closeButton = this.page.locator('#react-burger-cross-btn');
    // AKB metadata: LNK_LOGOUTSIDEBARLINK dataTest = 'logout-sidebar-link'
    this.logoutLink = this.page.getByTestId('logout-sidebar-link');
  }

  async openMenu() {
    await this.menuButton.click();
    await expect(this.closeButton).toBeVisible();
  }

  async clickLogout() {
    await this.logoutLink.click();
  }

  async verifyLoggedOut() {
    // AKB metadata for home BTN_LOGINBUTTON dataTest = 'login-button'
    await expect(this.page.getByTestId('login-button')).toBeVisible();
  }
}

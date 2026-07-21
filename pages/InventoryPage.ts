import { expect, Locator, Page } from "@playwright/test";

export class InventoryPage {
  private page: Page;
  private readonly menuButton: Locator;
  private readonly logoutLink: Locator;
  private readonly inventoryContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    // Using AKB metadata: BTN_REACTBURGERMENUBTN -> button with name "Open Menu"
    this.menuButton = this.page.getByRole('button', { name: 'Open Menu' });
    // Using AKB metadata: LNK_LOGOUTSIDEBARLINK -> data-test = 'logout-sidebar-link'
    this.logoutLink = this.page.getByTestId('logout-sidebar-link');
    // Using AKB metadata: ELM_INVENTORYCONTAINER -> data-test = 'inventory-container'
    this.inventoryContainer = this.page.getByTestId('inventory-container');
  }

  async verifyInventoryPageDisplayed() {
    await expect(this.inventoryContainer).toBeVisible();
  }

  async openMenu() {
    await this.menuButton.click();
  }

  async verifyMenuDisplayed() {
    await expect(this.logoutLink).toBeVisible();
  }

  async clickLogout() {
    await this.logoutLink.click();
  }

  async verifyInventoryNotDisplayed() {
    // After logout the inventory container should not be present on the login page
    await expect(this.inventoryContainer).toHaveCount(0);
  }
}

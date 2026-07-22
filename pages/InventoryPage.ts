import { expect, Locator, Page } from "@playwright/test";

export class InventoryPage {
  private page: Page;
  private readonly menuButton: Locator;
  private readonly logoutLink: Locator;
  private readonly inventoryContainer: Locator;
  private readonly inventoryList: Locator;

  constructor(page: Page) {
    this.page = page;
    // AKB provided locators / attributes
    this.menuButton = this.page.locator('#react-burger-menu-btn');
    this.logoutLink = this.page.getByTestId('logout-sidebar-link');
    this.inventoryContainer = this.page.getByTestId('inventory-container');
    this.inventoryList = this.page.getByTestId('inventory-list');
  }

  async openMenu() {
    await this.menuButton.click();
  }

  async isMenuDisplayed() {
    await expect(this.logoutLink).toBeVisible();
  }

  async clickLogout() {
    await this.logoutLink.click();
  }

  async isInventoryVisible() {
    await expect(this.inventoryContainer).toBeVisible();
  }

  async verifyRedirectedToLogin() {
    // Verify login controls are visible
    await expect(this.page.getByPlaceholder('Username')).toBeVisible();
    await expect(this.page.getByPlaceholder('Password')).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Login' })).toBeVisible();

    // Inventory should not be visible anymore
    await expect(this.inventoryContainer).not.toBeVisible();

    // Ensure URL does not contain inventory path
    await expect(this.page).not.toHaveURL(/inventory/);
  }

  // Navigate browser back
  async goBack() {
    await this.page.goBack();
  }

  // Navigate directly to inventory URL
  async navigateToInventory() {
    await this.page.goto('/inventory.html');
  }
}

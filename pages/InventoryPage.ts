import { expect, Locator, Page } from "@playwright/test";

export class InventoryPage {
  private page: Page;
  private readonly openMenuButton: Locator;
  private readonly logoutLink: Locator;
  private readonly closeMenuElement: Locator;
  private readonly inventoryContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    // AKB mapped locators
    this.openMenuButton = this.page.getByRole('button', { name: 'Open Menu' });
    this.logoutLink = this.page.locator('#logout_sidebar_link');
    this.closeMenuElement = this.page.getByText('Close Menu');
    this.inventoryContainer = this.page.locator('#inventory_container');
  }

  async openMenu() {
    await this.openMenuButton.click();
    await expect(this.closeMenuElement).toBeVisible();
  }

  async isMenuVisible() {
    await expect(this.closeMenuElement).toBeVisible();
  }

  async clickLogout() {
    await this.logoutLink.click();
  }

  async verifyInventoryNotAccessible() {
    // High-level verification: inventory container should not be visible and URL should not contain /inventory
    await expect(this.inventoryContainer).toBeHidden();
    await expect(this.page).not.toHaveURL(/inventory/);
  }
}

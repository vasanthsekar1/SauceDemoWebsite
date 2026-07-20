import { expect, Locator, Page } from "@playwright/test";

export class InventoryPage {
  private page: Page;
  private readonly menuButton: Locator;
  private readonly logoutLink: Locator;
  private readonly inventoryContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    // AKB locators
    this.menuButton = this.page.getByRole("button", { name: "Open Menu" });
    // Use role-based locator for logout link per repository locator priority
    this.logoutLink = this.page.getByRole("link", { name: "Logout" });
    this.inventoryContainer = this.page.locator('.inventory_list');
  }

  async openMenu() {
    await this.menuButton.click();
  }

  async verifyMenuVisible() {
    // verify that menu options like All Items are visible
    await expect(this.page.getByText("All Items")).toBeVisible();
  }

  async clickLogout() {
    await this.logoutLink.click();
    // wait for navigation to the login page
    await this.page.waitForURL("/");
  }

  async verifyRedirectedToLogin() {
    // Verify URL is the login page root
    await expect(this.page).toHaveURL("/");
    // Verify login UI elements are visible
    await expect(this.page.getByPlaceholder("Username")).toBeVisible();
    await expect(this.page.getByPlaceholder("Password")).toBeVisible();
    await expect(this.page.getByRole("button", { name: "Login" })).toBeVisible();
  }

  async verifyInventoryNotAccessible() {
    // Ensure URL does not contain inventory path
    await expect(this.page).not.toHaveURL(/inventory/);
    // Ensure inventory container (authenticated content) is not visible
    await expect(this.inventoryContainer).not.toBeVisible();
  }

  // New helper methods to simulate post-logout navigation actions
  public async simulateBrowserBack() {
    // Use browser back navigation and wait for the login page to stabilize
    await this.page.goBack();
    // After attempting to go back to an authenticated page, the application should redirect to login
    await this.page.waitForURL("/", { timeout: 5000 });
  }

  public async navigateToInventoryDirect() {
    // Navigate directly to the inventory URL
    await this.page.goto('/inventory.html');
    // Application should redirect unauthenticated users to login; wait for root
    await this.page.waitForURL("/", { timeout: 5000 });
  }

  public async navigateToBookmark(url: string) {
    // Simulate visiting a bookmarked URL (full or relative)
    await this.page.goto(url);
    // Wait for redirect to login if not authenticated
    await this.page.waitForURL("/", { timeout: 5000 });
  }
}

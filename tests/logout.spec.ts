import { test, expect } from "../fixtures/testFixtures";
import { users } from "../test-data/users";

test("@SCRUM-4 Verify Logout from Inventory via Menu", async ({ pom, page }) => {
  // Precondition: login
  await pom.loginPage.login(users.standardUser.username, users.standardUser.password);
  await pom.loginPage.verifySuccessfulLogin();

  // Open menu and verify
  await pom.inventoryPage.openMenu();

  // Click logout
  await pom.inventoryPage.clickLogout();

  // Verify redirection to login URL (functional level)
  await expect(page).toHaveURL(/saucedemo\.com|^\//);

  // Verify Username, Password and Login button visible on the login page
  await expect(page.getByPlaceholder("Username")).toBeVisible();
  await expect(page.getByPlaceholder("Password")).toBeVisible();
  await expect(page.getByRole("button", { name: "Login" })).toBeVisible();

  // Dataset 1: Simulate browser Back button and verify user remains logged out
  await page.goBack();
  // Expect to be at login page and login controls visible
  await expect(page).toHaveURL(/saucedemo\.com|^\//);
  await expect(page.getByPlaceholder("Username")).toBeVisible();
  await expect(page.getByPlaceholder("Password")).toBeVisible();
  await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
  // High-level inventory inaccessible check
  await pom.inventoryPage.verifyInventoryNotAccessible();

  // Dataset 2: Direct navigation to full inventory URL and verify access denied
  await page.goto('https://www.saucedemo.com/inventory.html');
  // After navigating to protected route, app should require re-login (login controls visible)
  await expect(page.getByPlaceholder("Username")).toBeVisible();
  await expect(page.getByPlaceholder("Password")).toBeVisible();
  await expect(page.getByRole("button", { name: "Login" })).toBeVisible();

  // Additional high-level check via InventoryPage helper
  await pom.inventoryPage.verifyInventoryNotAccessible();
});
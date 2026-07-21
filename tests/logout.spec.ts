import { test, expect } from "../fixtures/testFixtures";
import { users } from "../test-data/users";

test("@SCRUM-4 Verify authenticated user can logout and is redirected to login page", async ({ pom, page }) => {
  // Login
  await pom.loginPage.login(users.standardUser.username, users.standardUser.password);
  await pom.loginPage.verifySuccessfulLogin();

  // Ensure inventory is visible
  await pom.inventoryPage.verifyInventoryPageDisplayed();

  // Open menu and logout
  await pom.inventoryPage.openMenu();
  await pom.inventoryPage.verifyMenuDisplayed();
  await pom.inventoryPage.clickLogout();

  // Verify redirected to login page
  await expect(page).toHaveURL(/saucedemo\.com\/$/i);

  // Verify login fields visible
  await expect(page.getByPlaceholder('Username')).toBeVisible();
  await expect(page.getByPlaceholder('Password')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

  // Verify inventory not accessible
  await pom.inventoryPage.verifyInventoryNotDisplayed();

  // Simulate browser Back navigation - user should NOT regain authenticated inventory
  await page.goBack();

  // After going back, ensure user is presented with login page (or redirected to login)
  await expect(page).toHaveURL(/saucedemo\.com\/$/i);
  await expect(page.getByPlaceholder('Username')).toBeVisible();
  await expect(page.getByPlaceholder('Password')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  await pom.inventoryPage.verifyInventoryNotDisplayed();

  // Attempt direct navigation to inventory URL - should redirect to login and not display inventory
  await page.goto('/inventory.html');
  await expect(page).toHaveURL(/saucedemo\.com\/$/i);
  await expect(page.getByPlaceholder('Username')).toBeVisible();
  await expect(page.getByPlaceholder('Password')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  await pom.inventoryPage.verifyInventoryNotDisplayed();

  // Optional: refresh and ensure still requires authentication (session invalidated)
  await page.reload();
  await expect(page.getByPlaceholder('Username')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});
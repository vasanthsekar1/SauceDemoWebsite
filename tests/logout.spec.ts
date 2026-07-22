import { test } from '../fixtures/testFixtures';
import { users } from '../test-data/users';
import { PageManager } from '../pages/pageManager';

test.describe('Logout Flow Tests @SCRUM-4', () => {
  test('Standard Logout', async ({ pom, }) => {
    // Login
    await pom.loginPage.login(users.standardUser.username, users.standardUser.password);
    await pom.loginPage.verifySuccessfulLogin();

    // Ensure inventory visible
    await pom.inventoryPage.isInventoryVisible();

    // Open menu and logout
    await pom.inventoryPage.openMenu();
    await pom.inventoryPage.isMenuDisplayed();
    await pom.inventoryPage.clickLogout();

    // Assertions post logout
    await pom.inventoryPage.verifyRedirectedToLogin();
  });

  test('Browser Back after Logout', async ({ pom }) => {
    // Login
    await pom.loginPage.login(users.standardUser.username, users.standardUser.password);
    await pom.loginPage.verifySuccessfulLogin();

    // Ensure inventory visible
    await pom.inventoryPage.isInventoryVisible();

    // Open menu and logout
    await pom.inventoryPage.openMenu();
    await pom.inventoryPage.isMenuDisplayed();
    await pom.inventoryPage.clickLogout();

    // Press browser back via page object
    await pom.inventoryPage.goBack();

    // Verify still at login and inventory not accessible
    await pom.inventoryPage.verifyRedirectedToLogin();
  });

  test('Direct URL after Logout', async ({ pom }) => {
    // Login
    await pom.loginPage.login(users.standardUser.username, users.standardUser.password);
    await pom.loginPage.verifySuccessfulLogin();

    // Ensure inventory visible
    await pom.inventoryPage.isInventoryVisible();

    // Open menu and logout
    await pom.inventoryPage.openMenu();
    await pom.inventoryPage.isMenuDisplayed();
    await pom.inventoryPage.clickLogout();

    // Navigate directly to inventory url via page object
    await pom.inventoryPage.navigateToInventory();

    // Verify redirected to login
    await pom.inventoryPage.verifyRedirectedToLogin();
  });

  test('Logout invalidates other tabs @SCRUM-4', async ({ pom, page }) => {
    // Tab A: Login and verify inventory
    await pom.loginPage.login(users.standardUser.username, users.standardUser.password);
    await pom.loginPage.verifySuccessfulLogin();
    await pom.inventoryPage.isInventoryVisible();

    // Tab B: create a new page and ensure logged in or can access inventory
    const pageB = await page.context().newPage();
    const pmB = new PageManager(pageB);

    // Navigate to app root in Tab B
    await pageB.goto('/');

    // Try to access inventory in Tab B; if not logged in, perform login
    await pmB.loginPage.login(users.standardUser.username, users.standardUser.password).catch(() => {});

    // Verify inventory visible in Tab B
    try {
      await pmB.inventoryPage.isInventoryVisible();
    } catch (e) {
      // If inventory not visible after login attempt, try navigating directly
      await pmB.inventoryPage.navigateToInventory();
    }

    // Ensure Tab B is at inventory before logout
    await pmB.inventoryPage.isInventoryVisible();

    // Tab A: logout
    await pom.inventoryPage.openMenu();
    await pom.inventoryPage.isMenuDisplayed();
    await pom.inventoryPage.clickLogout();
    await pom.inventoryPage.verifyRedirectedToLogin();

    // Tab B: attempt protected action - reload and navigate to inventory
    await pageB.reload();
    await pmB.inventoryPage.navigateToInventory();

    // Verify Tab B redirected to login
    await pmB.inventoryPage.verifyRedirectedToLogin();

    // Close Tab B
    await pageB.close();
  });
});

import { test, expect } from "../fixtures/testFixtures";
import { users } from "../test-data/users";

// Keep existing test intact
test("@SCRUM-4 Verify user can logout via hamburger menu", async ({ pom }) => {
  // Login
  await pom.loginPage.login(users.standardUser.username, users.standardUser.password);
  await pom.loginPage.verifySuccessfulLogin();

  // Ensure inventory page object is available
  await expect(pom.inventoryPage).toBeDefined();

  // Open menu and verify
  await pom.inventoryPage.openMenu();
  await pom.inventoryPage.verifyMenuVisible();

  // Click logout and verify redirected to login
  await pom.inventoryPage.clickLogout();
  await pom.inventoryPage.verifyRedirectedToLogin();

  // Verify inventory is not accessible
  await pom.inventoryPage.verifyInventoryNotAccessible();
});

// New parameterized test covering Back, Direct URL, Bookmark
const datasets = [
  {
    name: "Browser Back",
    action: async (inventoryPage: any) => {
      await inventoryPage.simulateBrowserBack();
    },
  },
  {
    name: "Direct URL",
    action: async (inventoryPage: any) => {
      await inventoryPage.navigateToInventoryDirect();
    },
  },
  {
    name: "Bookmark",
    action: async (inventoryPage: any) => {
      await inventoryPage.navigateToBookmark('/inventory.html');
    },
  },
];

for (const data of datasets) {
  test(`@SCRUM-4 TC_002 Post-logout access prevention - ${data.name}`, async ({ pom }) => {
    // Login and verify
    await pom.loginPage.login(users.standardUser.username, users.standardUser.password);
    await pom.loginPage.verifySuccessfulLogin();

    // Open menu and logout
    await pom.inventoryPage.openMenu();
    await pom.inventoryPage.verifyMenuVisible();
    await pom.inventoryPage.clickLogout();
    await pom.inventoryPage.verifyRedirectedToLogin();

    // Perform post-logout navigation action
    await data.action(pom.inventoryPage);

    // Assertions: ensure login page is shown and inventory is not accessible
    await pom.inventoryPage.verifyRedirectedToLogin();
    await pom.inventoryPage.verifyInventoryNotAccessible();
  });
}

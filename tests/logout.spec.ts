import { test } from "../fixtures/testFixtures";
import { users } from "../test-data/users";

test("@SCRUM-2 Verify Logout", async ({ pom }) => {
  // Precondition: login
  await pom.loginPage.login(users.standardUser.username, users.standardUser.password);
  await pom.loginPage.verifySuccessfulLogin();

  // Open menu and logout
  await pom.inventoryPage.openMenu();
  await pom.inventoryPage.clickLogout();

  // Verify logged out and landed on login/homepage
  await pom.inventoryPage.verifyLoggedOut();
});

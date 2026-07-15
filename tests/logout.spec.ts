import { test, expect } from "../fixtures/testFixtures";
import { users } from "../test-data/users";

test.describe("SauceDemo Logout Tests", () => {
  test("@SCRUM-2 Verify Logout", async ({ pom }) => {
    await pom.loginPage.login(users.standardUser.username, users.standardUser.password);
    await pom.inventoryPage.logout();
    await pom.inventoryPage.verifyLogout();
  });
});
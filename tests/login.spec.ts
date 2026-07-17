import { test, expect } from "../fixtures/testFixtures";
import { users } from "../test-data/users";

test.describe("SauceDemo Login Tests", () => {

  test("Verify standard user can login successfully", async ({pom}) => {
    await pom.loginPage.login(users.standardUser.username,users.standardUser.password);
    await pom.loginPage.verifySuccessfulLogin();
  });

  test("Verify locked user cannot login", async ({pom}) => {
    await pom.loginPage.login(users.lockedUser.username,users.lockedUser.password);
    await pom.loginPage.verifyErrorMessage();
  });

});
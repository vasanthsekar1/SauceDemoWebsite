import { test, expect } from "../fixtures/testFixtures";
import { users } from "../test-data/users";

test.describe("SauceDemo Login Tests", () => {

  test("Verify standard user can login successfully", async ({
    loginPage
  }) => {

    await loginPage.navigateToLoginPage();

    await loginPage.login(
      users.standardUser.username,
      users.standardUser.password
    );

    await loginPage.verifySuccessfulLogin();
  });

  test("Verify locked user cannot login", async ({
    loginPage
  }) => {

    await loginPage.navigateToLoginPage();

    await loginPage.login(
      users.lockedUser.username,
      users.lockedUser.password
    );

    await loginPage.verifyErrorMessage();
  });

});
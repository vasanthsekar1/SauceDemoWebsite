import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
   private page:Page
   private readonly username:Locator
   private readonly password:Locator
   private readonly loginButton:Locator
   private readonly errorMessage:Locator

  constructor(page: Page) {
   this.page=page
   this.username =this.page.getByPlaceholder("Username")
   this.password =this.page.getByPlaceholder("Password")
   this.loginButton = this.page.getByRole("button", { name: "Login" })
   this.errorMessage =this.page.getByTestId("error")
  }

  async login(username: string, password: string) {
    await this.username.fill(username)
    await this.password.fill(password)
    await this.loginButton.click()
  }

  async verifySuccessfulLogin() {
    await expect(this.page).toHaveURL(/inventory/)
  }

  async verifyErrorMessage() {
    await expect(this.errorMessage).toBeVisible()
  }
}
import { expect, Locator, Page } from "@playwright/test";

export class InventoryPage {
   private page: Page;
   private readonly hamburgerMenu: Locator;
   private readonly logoutLink: Locator;

   constructor(page: Page) {
       this.page = page;
       this.hamburgerMenu = this.page.getByRole("button", { name: "Open Menu" });
       this.logoutLink = this.page.getByTestId("logout-sidebar-link");
   }

   async logout() {
       await this.hamburgerMenu.click();
       await this.logoutLink.click();
   }

   async verifyLogout() {
       await expect(this.page).toHaveURL("/");
   }

   async navigateToHomePage() {
       await this.page.goto("/");
   }
}
import { test as base } from "@playwright/test";
export { expect } from "@playwright/test";
import { PageManager } from "../pages/pageManager";


type Fixtures = {
  pom: PageManager;
};

export const test = base.extend<Fixtures>({
  pom: async ({ page }, use) => {
    await page.goto("/")
    await use(new PageManager(page));
  },
});
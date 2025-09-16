import { test, expect } from "@playwright/test";


test.describe("Home page with no auth", () => {
 test.beforeEach(async ({ page }) => {
   await page.goto("https://practicesoftwaretesting.com/");
 });


 test("Visual test - no auth", async ({ page }) => {
   await page.waitForLoadState("domcontentloaded");
   await expect(page).toHaveScreenshot("home-page-no-auth.png", {
     mask: [page.getByTitle("Practice Software Testing - Toolshop")],
   });
 });


 test("Check customer 01 is signed in", async ({ page }) => {
   await expect(page.getByTestId("nav-sign-in")).toHaveText("Sign in");
 });


 test("Validate page title", async ({ page }) => {
   await expect(page).toHaveTitle(
     "Practice Software Testing - Toolshop - v5.0"
   );
 });


 test("Grid loads with 9 items", async ({ page }) => {
   const productsGrid = page.locator(".col-md-9");
   // using locator assertion
   await expect(productsGrid.getByRole("link")).toHaveCount(9);
   // using value assertion
   expect(await productsGrid.getByRole("link").count()).toBe(9);
 });


 test("Search for Thor Hammer", async ({ page }) => {
   const productsGrid = page.locator(".col-md-9");
   await page.getByTestId("search-query").fill("Thor Hammer");
   await page.getByTestId("search-submit").click();


   await expect(productsGrid.getByRole("link")).toHaveCount(1);
   await expect(productsGrid.getByAltText("Thor Hammer")).toBeVisible();
 });
});


test.describe("Home page customer 01 auth", () => {
 test.use({ storageState: ".auth/customer01.json" });
 test.beforeEach(async ({ page }) => {
   await page.goto("https://practicesoftwaretesting.com/");
 });


 test("Visual test - authorised", async ({ page }) => {
   await page.waitForLoadState("networkidle");
   await expect(page).toHaveScreenshot("home-page-customer01.png", {
     mask: [page.getByTitle("Practice Software Testing - Toolshop")],
   });
 });


 test("Check customer 01 is signed in", async ({ page }) => {
   await expect(page.getByTestId("nav-sign-in")).not.toBeVisible();
 });


 test("Validate page title", async ({ page }) => {
   await expect(page).toHaveTitle(
     "Practice Software Testing - Toolshop - v5.0"
   );
 });
});




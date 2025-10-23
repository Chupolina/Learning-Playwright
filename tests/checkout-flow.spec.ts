import {test, expect} from "@playwright/test"

test.describe("Checkout flow test: buy now pay later", () => {
    test.use({storageState: ".auth/customer01.json"});
    test.beforeEach(async ({page}) => {
        await page.goto("https://practicesoftwaretesting.com/");
        await page.waitForLoadState("domcontentloaded");
    })

test("Add an item to the cart", async ({page}) => {
    // Open product page for Thor Hammer
    await page.getByTestId("nav-home").click();
    await page.getByText('Thor Hammer').click();

    // Add product to the cart
    await expect(page.getByTestId("product-name")).toContainText("Thor Hammer");
    await page.getByTestId("add-to-cart").click();
    await expect(page.getByRole("alert")).toHaveText("Product added to shopping cart.");
    await expect(page.getByTestId("cart-quantity")).toHaveText("1");
    await page.getByRole("alert").click();
    
    // Open the cart
    await page.getByTestId("nav-cart").click();
    await page.getByTestId("proceed-1").click();
    await page.getByTestId("proceed-2").click();

    //Fill the billing address
    expect(page.getByTestId("proceed-3")).toBeDisabled();
    await page.getByTestId("state").fill("Wien");
    await page.getByTestId("postal_code").fill("1010");
    expect(page.getByTestId("proceed-3")).toBeEnabled();
    await page.getByTestId("proceed-3").click();

    //Select payment method = Buy Now Pay Later
    expect(page.locator("app-payment h3")).toHaveText("Payment");
    expect(page.getByTestId("finish")).toBeDisabled();
    await page.getByTestId("payment-method").selectOption("Buy Now Pay Later");
    await page.getByTestId("monthly_installments").selectOption("3 Monthly Installments");
    expect(page.getByTestId("finish")).toBeEnabled();
    page.getByTestId("finish").click();
    expect(page.getByTestId("payment-success-message")).toBeVisible();
})
});
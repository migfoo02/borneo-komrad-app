import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  // get the sign in button
  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("1@1.com");
  await page.locator("[name=password]").fill("password123");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Sign in Successful!")).toBeVisible();
});

test("should show activity search results", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going?").fill("Semporna");
  await page.getByRole("button", { name: "Search" }).click();

  await expect(page.getByText("Activities found in Semporna")).toBeVisible();
  await expect(page.getByText("Semporna Tour")).toBeVisible();
});

test("should show activity detail", async ({ page }) => {
    await page.goto(UI_URL);
  
    await page.getByPlaceholder("Where are you going?").fill("Semporna");
    await page.getByRole("button", { name: "Search" }).click();
  
    await page.getByText("Semporna Tour").click();
    await expect(page).toHaveURL(/details/);
    await expect(page.getByRole("button", { name: "Book now" })).toBeVisible();
  });
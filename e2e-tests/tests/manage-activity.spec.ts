import { test, expect } from "@playwright/test";
import path from "path";

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

test("should allow user to add an activity", async ({ page }) => {
  await page.goto(`${UI_URL}add-activity`);

  await page.locator('[name="name"]').fill("Test Activity");
  await page.locator('[name="city"]').fill("Test City");
  await page.locator('[name="country"]').fill("Test Country");
  await page
    .locator('[name="description"]')
    .fill("This is a description for the Test Activity");
  await page.locator('[name="price"]').fill("50");
  await page.selectOption('select[name="starRating"]', "3");

  await page.getByText("Cruises").click();

  await page.getByLabel("Lunch").check();
  await page.getByLabel("English-speaking staff").check();

  await page.locator('[name="guestCount"]').fill("2");

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files", "test-tour-1.jpg"),
    path.join(__dirname, "files", "test-tour-2.jpg"),
  ]);

  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Activity Saved!")).toBeVisible();
});

test("should display activities", async ({ page }) => {
  await page.goto(`${UI_URL}my-activities`);

  await expect(page.getByText("Semporna Tour")).toBeVisible();
  await expect(page.getByText("Lorem ipsum dolor sit amet")).toBeVisible();
  await expect(page.getByText("Semporna, Malaysia")).toBeVisible();
  await expect(page.getByText("Tours")).toBeVisible();
  await expect(page.getByText("$100")).toBeVisible();
  await expect(page.getByText("5 guests")).toBeVisible();
  await expect(page.getByText("5 Star Rating")).toBeVisible();

  await expect(
    page.getByRole("link", { name: "View Details" }).first()
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Add Activity" })).toBeVisible();
});

test("should edit activity", async ({ page }) => {
  await page.goto(`${UI_URL}my-activities`);

  await page.getByRole("link", { name: "View Details" }).first().click();

  await page.waitForSelector('[name="name"]', { state: "attached" });
  await expect(page.locator('[name="name"]')).toHaveValue("Semporna Tour");
  await page.locator('[name="name"]').fill("Semporna Tour UPDATED");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Activity Saved!")).toBeVisible();

  await page.reload();

  await expect(page.locator('[name="name"]')).toHaveValue(
    "Semporna Tour UPDATED"
  );
  await page.locator('[name="name"]').fill("Semporna Tour");
  await page.getByRole("button", { name: "Save" }).click();
});
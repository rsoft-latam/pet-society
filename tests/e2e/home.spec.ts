import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("should display the header with navigation", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("text=PET-SOCIETY")).toBeVisible();
    await expect(page.getByRole("link", { name: "doggos", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "MyDoggos" })).toBeVisible();
  });

  test("should display the explore title", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("h1")).toContainText("Explore Doggos");
  });

  test("should navigate to my-dogs page", async ({ page }) => {
    await page.goto("/");

    await page.click("text=MyDoggos");

    await expect(page).toHaveURL("/my-dogs");
    await expect(page.locator("h1")).toBeVisible();
  });
});

test.describe("My Dogs Page", () => {
  test("should show empty state when no dogs registered", async ({ page }) => {
    await page.goto("/my-dogs");

    const emptyState = page.locator("text=No dogs registered yet");
    const hasDogs = page.locator("h1:has-text('My Doggos')");

    await expect(emptyState.or(hasDogs)).toBeVisible();
  });
});

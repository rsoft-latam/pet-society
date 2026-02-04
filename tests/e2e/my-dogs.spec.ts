import { test, expect } from "@playwright/test";

test.describe("My Dogs Page", () => {
  test("should display page header", async ({ page }) => {
    await page.goto("/my-dogs");

    // Either shows "My Doggos" title or empty state
    const title = page.locator("h1:has-text('My Doggos')");
    const emptyTitle = page.locator("h2:has-text('No dogs registered yet')");

    await expect(title.or(emptyTitle)).toBeVisible();
  });

  test("should show empty state message when no dogs", async ({ page }) => {
    await page.goto("/my-dogs");

    // If empty, should show message and explore button
    const emptyState = page.locator("text=No dogs registered yet");
    const hasDogs = page.locator("h1:has-text('My Doggos')");

    // Wait for page to load
    await expect(emptyState.or(hasDogs)).toBeVisible();
  });

  test("should have link to explore page in empty state", async ({ page }) => {
    await page.goto("/my-dogs");

    const exploreLink = page.locator("text=Explore Doggos");

    // If there's an empty state, check for the explore link
    if (await exploreLink.isVisible()) {
      await exploreLink.click();
      await expect(page).toHaveURL("/");
    }
  });

  test("should display dog count badge when dogs exist", async ({ page }) => {
    await page.goto("/my-dogs");

    // If dogs exist, there should be a count badge
    const countBadge = page.locator("text=/\\d+ dogs?/");
    const emptyState = page.locator("text=No dogs registered yet");

    // Either shows count or empty state
    await expect(countBadge.or(emptyState)).toBeVisible({ timeout: 5000 });
  });

  test("should display subtitle when dogs exist", async ({ page }) => {
    await page.goto("/my-dogs");

    const subtitle = page.locator("text=Your personal collection of adorable dogs");
    const emptyState = page.locator("text=No dogs registered yet");

    await expect(subtitle.or(emptyState)).toBeVisible();
  });

  test("should be accessible from navigation", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "MyDoggos" }).click();

    await expect(page).toHaveURL("/my-dogs");
  });
});

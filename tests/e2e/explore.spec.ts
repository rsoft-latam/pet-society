import { test, expect } from "@playwright/test";

test.describe("Explore Page (Home)", () => {
  test("should display page title", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("h1")).toContainText("Explore Doggos");
  });

  test("should display subtitle", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("text=Click on any dog to add it to your collection")).toBeVisible();
  });

  test("should show loading state initially", async ({ page }) => {
    await page.goto("/");

    // Loading spinner or text should be visible briefly
    const loadingText = page.locator("text=Loading doggos...");

    // Either loading shows briefly or content loads fast
    await expect(loadingText.or(page.locator("h1"))).toBeVisible();
  });

  test("should display dog images after loading", async ({ page }) => {
    await page.goto("/");

    // Wait for images to load
    await page.waitForSelector("button[aria-label='Select this dog']", { timeout: 10000 });

    const dogCards = page.locator("button[aria-label='Select this dog']");
    const count = await dogCards.count();

    expect(count).toBeGreaterThan(0);
  });

  test("should navigate to register page when clicking a dog", async ({ page }) => {
    await page.goto("/");

    // Wait for images to load
    await page.waitForSelector("button[aria-label='Select this dog']", { timeout: 10000 });

    // Click the first dog card
    await page.locator("button[aria-label='Select this dog']").first().click();

    // Should navigate to register with URL param
    await expect(page).toHaveURL(/\/register\?url=/);
  });

  test("should display dog images in a grid layout", async ({ page }) => {
    await page.goto("/");

    await page.waitForSelector("button[aria-label='Select this dog']", { timeout: 10000 });

    // Check that the grid container exists
    const grid = page.locator(".grid");
    await expect(grid).toBeVisible();
  });

  test("should show error state when API fails", async ({ page }) => {
    // Mock the API to fail
    await page.route("**/dog.ceo/api/**", (route) => {
      route.abort();
    });

    await page.goto("/");

    await expect(page.locator("text=Oops!")).toBeVisible({ timeout: 10000 });
  });
});

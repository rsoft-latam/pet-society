import { test, expect } from "@playwright/test";

test.describe("Register Page", () => {
  const testImageUrl = "https://images.dog.ceo/breeds/retriever-golden/n02099601_1234.jpg";

  test("should show 'no dog selected' message when accessing without URL", async ({ page }) => {
    await page.goto("/register");

    await expect(page.locator("text=No dog selected")).toBeVisible();
    await expect(page.locator("text=Go back to explore")).toBeVisible();
  });

  test("should navigate back to explore when clicking button on empty state", async ({ page }) => {
    await page.goto("/register");

    await page.click("text=Go back to explore");

    await expect(page).toHaveURL("/");
  });

  test("should display registration form when URL is provided", async ({ page }) => {
    await page.goto(`/register?url=${encodeURIComponent(testImageUrl)}`);

    await expect(page.locator("h1")).toContainText("Register Dog");
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[value="male"]')).toBeVisible();
    await expect(page.locator('input[value="female"]')).toBeVisible();
    await expect(page.locator('textarea[name="comment"]')).toBeVisible();
  });

  test("should display the selected dog image", async ({ page }) => {
    await page.goto(`/register?url=${encodeURIComponent(testImageUrl)}`);

    const image = page.locator('img[alt="Selected dog"]');
    await expect(image).toBeVisible();
  });

  test("should have date field pre-filled with today", async ({ page }) => {
    await page.goto(`/register?url=${encodeURIComponent(testImageUrl)}`);

    const dateInput = page.locator('input[name="lastSeenDate"]');
    const today = new Date().toISOString().split("T")[0];

    await expect(dateInput).toHaveValue(today);
  });

  test("should show validation error when submitting empty name", async ({ page }) => {
    await page.goto(`/register?url=${encodeURIComponent(testImageUrl)}`);

    await page.click('button[type="submit"]');

    await expect(page.locator("text=Name is required")).toBeVisible();
  });

  test("should show validation error when name is too short", async ({ page }) => {
    await page.goto(`/register?url=${encodeURIComponent(testImageUrl)}`);

    await page.fill('input[name="name"]', "A");
    await page.click('button[type="submit"]');

    await expect(page.locator("text=Name must be at least 2 characters")).toBeVisible();
  });

  test("should show validation error when gender is not selected", async ({ page }) => {
    await page.goto(`/register?url=${encodeURIComponent(testImageUrl)}`);

    await page.fill('input[name="name"]', "Max");
    await page.click('button[type="submit"]');

    await expect(page.locator("text=Gender is required")).toBeVisible();
  });

  test("should have cancel button that navigates back", async ({ page }) => {
    await page.goto("/");
    await page.goto(`/register?url=${encodeURIComponent(testImageUrl)}`);

    await page.click("text=Cancel");

    await expect(page).toHaveURL("/");
  });

  test("should display tag info message", async ({ page }) => {
    await page.goto(`/register?url=${encodeURIComponent(testImageUrl)}`);

    await expect(page.locator("text=A unique tag will be auto-generated")).toBeVisible();
  });
});

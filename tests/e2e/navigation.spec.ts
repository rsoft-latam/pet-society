import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("should navigate from home to my-dogs using header", async ({ page }) => {
    await page.goto("/");

    await page.click('a[href="/my-dogs"]');

    await expect(page).toHaveURL("/my-dogs");
  });

  test("should navigate from my-dogs to home using header", async ({ page }) => {
    await page.goto("/my-dogs");

    await page.click('a[href="/"]');

    await expect(page).toHaveURL("/");
  });

  test("should navigate to home by clicking logo", async ({ page }) => {
    await page.goto("/my-dogs");

    await page.click("text=PET-SOCIETY");

    await expect(page).toHaveURL("/");
  });

  test("should highlight correct tab on home page", async ({ page }) => {
    await page.goto("/");

    const doggosTab = page.getByRole("link", { name: "doggos", exact: true });
    const myDoggosTab = page.getByRole("link", { name: "MyDoggos" });

    await expect(doggosTab).toHaveClass(/tab-button-active/);
    await expect(myDoggosTab).toHaveClass(/tab-button-inactive/);
  });

  test("should highlight correct tab on my-dogs page", async ({ page }) => {
    await page.goto("/my-dogs");

    const doggosTab = page.getByRole("link", { name: "doggos", exact: true });
    const myDoggosTab = page.getByRole("link", { name: "MyDoggos" });

    await expect(doggosTab).toHaveClass(/tab-button-inactive/);
    await expect(myDoggosTab).toHaveClass(/tab-button-active/);
  });

  test("should keep doggos tab active on register page", async ({ page }) => {
    await page.goto("/register");

    const doggosTab = page.getByRole("link", { name: "doggos", exact: true });

    await expect(doggosTab).toHaveClass(/tab-button-active/);
  });
});

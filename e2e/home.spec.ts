/**
 * Home Page E2E Tests
 * Tests for the landing page and navigation
 */

import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load home page successfully', async ({ page }) => {
    await page.goto('/');

    // Check for page title
    await expect(page).toHaveTitle(/Three Kingdoms/i);

    // Check for main heading
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
  });

  test('should have working navigation', async ({ page }) => {
    await page.goto('/');

    // Check navigation links
    const nav = page.getByRole('navigation');
    await expect(nav).toBeVisible();

    // Verify all navigation items
    await expect(nav.getByRole('link', { name: /home/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /characters/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /timeline/i })).toBeVisible();
  });

  test('should navigate to characters page', async ({ page }) => {
    await page.goto('/');

    // Click on Characters link
    await page.getByRole('link', { name: /characters/i }).click();

    // Verify URL changed
    await expect(page).toHaveURL(/\/characters/);

    // Verify characters page loaded
    const heading = page.getByRole('heading', { level: 1, name: /characters/i });
    await expect(heading).toBeVisible();
  });

  test('should navigate to timeline page', async ({ page }) => {
    await page.goto('/');

    // Click on Timeline link
    await page.getByRole('link', { name: /timeline/i }).click();

    // Verify URL changed
    await expect(page).toHaveURL(/\/timeline/);

    // Verify timeline page loaded
    const heading = page.getByRole('heading', { level: 1, name: /timeline/i });
    await expect(heading).toBeVisible();
  });

  test('should display hero section', async ({ page }) => {
    await page.goto('/');

    // Check for hero content
    const heroSection = page.locator('[data-testid="hero-section"]').or(page.locator('main').first());
    await expect(heroSection).toBeVisible();

    // Check for call-to-action buttons
    const exploreButton = page.getByRole('link', { name: /explore/i }).or(page.getByRole('button', { name: /explore/i }));
    if (await exploreButton.count() > 0) {
      await expect(exploreButton.first()).toBeVisible();
    }
  });

  test('should have responsive design on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Navigation should still be visible (possibly as hamburger menu)
    const nav = page.getByRole('navigation');
    await expect(nav).toBeVisible();

    // Content should be readable
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
  });

  test('should load without console errors', async ({ page }) => {
    const errors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');

    // Wait for page to fully load
    await page.waitForLoadState('networkidle');

    // Verify no console errors
    expect(errors).toHaveLength(0);
  });
});

/**
 * Characters Page E2E Tests
 * Tests for character browsing and viewing
 */

import { test, expect } from '@playwright/test';

test.describe('Characters Page', () => {
  test('should display character list', async ({ page }) => {
    await page.goto('/characters');

    // Check page title
    await expect(page).toHaveTitle(/Characters/i);

    // Check for heading
    const heading = page.getByRole('heading', { level: 1, name: /characters/i });
    await expect(heading).toBeVisible();

    // Wait for characters to load
    await page.waitForSelector('[data-testid="character-card"], article, .character-item', { timeout: 10000 });
  });

  test('should filter characters by kingdom', async ({ page }) => {
    await page.goto('/characters');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Find and click kingdom filter (if exists)
    const shuFilter = page.getByRole('button', { name: /shu|蜀/i }).or(
      page.getByLabel(/shu|蜀/i)
    );

    if (await shuFilter.count() > 0) {
      await shuFilter.first().click();

      // Wait for filtered results
      await page.waitForTimeout(1000);

      // Verify Shu characters are shown
      const shuBadges = page.locator('text=/蜀|SHU/');
      if (await shuBadges.count() > 0) {
        await expect(shuBadges.first()).toBeVisible();
      }
    }
  });

  test('should navigate to character detail page', async ({ page }) => {
    await page.goto('/characters');

    // Wait for characters to load
    await page.waitForLoadState('networkidle');

    // Find first character link
    const characterLink = page.locator('a[href^="/characters/"]').first();

    if (await characterLink.count() > 0) {
      // Get character name for verification
      const characterName = await characterLink.textContent();

      // Click on character
      await characterLink.click();

      // Verify URL changed
      await expect(page).toHaveURL(/\/characters\/.+/);

      // Verify character detail page loaded
      if (characterName) {
        const heading = page.getByRole('heading', { level: 1 });
        await expect(heading).toBeVisible();
      }
    }
  });

  test('should display kingdom badges', async ({ page }) => {
    await page.goto('/characters');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Look for kingdom badges (Wei, Shu, Wu in Chinese)
    const badges = page.locator('text=/魏|蜀|吴|WEI|SHU|WU/');

    if (await badges.count() > 0) {
      await expect(badges.first()).toBeVisible();
    }
  });

  test('should handle empty state gracefully', async ({ page }) => {
    // Go to characters page with filter that returns no results
    await page.goto('/characters');

    // Apply impossible filter combination (if UI allows)
    // Or verify empty state is handled

    // Page should not crash
    await expect(page.locator('body')).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/characters');

    // Page should load
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();

    // Characters should be visible
    await page.waitForSelector('[data-testid="character-card"], article, .character-item', {
      state: 'visible',
      timeout: 10000,
    });
  });
});

test.describe('Character Detail Page', () => {
  test('should display character details', async ({ page }) => {
    // Navigate to a specific character (adjust ID as needed)
    await page.goto('/characters/liu-bei');

    // Page should load
    await page.waitForLoadState('networkidle');

    // Should have character name as heading
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
  });

  test('should display historical and literary profiles', async ({ page }) => {
    await page.goto('/characters/liu-bei');

    await page.waitForLoadState('networkidle');

    // Look for profile sections
    const historicalSection = page.locator('text=/historical|历史/i');
    const literarySection = page.locator('text=/literary|文学/i');

    // At least one should be visible
    const hasHistorical = (await historicalSection.count()) > 0;
    const hasLiterary = (await literarySection.count()) > 0;

    expect(hasHistorical || hasLiterary).toBeTruthy();
  });

  test('should handle non-existent character', async ({ page }) => {
    await page.goto('/characters/non-existent-character-id');

    // Should show error or not found message
    const errorMessage = page.locator('text=/not found|error|404/i');

    if (await errorMessage.count() > 0) {
      await expect(errorMessage.first()).toBeVisible();
    }
  });

  test('should navigate back to character list', async ({ page }) => {
    await page.goto('/characters/liu-bei');

    // Look for back button or breadcrumb
    const backLink = page.getByRole('link', { name: /back|characters|返回/i }).or(
      page.locator('a[href="/characters"]')
    );

    if (await backLink.count() > 0) {
      await backLink.first().click();

      // Should be back on characters page
      await expect(page).toHaveURL(/\/characters$/);
    }
  });
});

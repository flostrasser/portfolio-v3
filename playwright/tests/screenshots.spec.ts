import { expect, test } from '@playwright/test';
import { waitForImages } from './helpers/wait-for-images';

test.describe('Screenshots', () => {
  test('should match full page screenshot', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await waitForImages(page);
    await expect(page).toHaveScreenshot('full-page.png', { fullPage: true });
  });

  test('should match mobile menu screenshot', async ({ page }, testInfo) => {
    test.skip(
      testInfo.project.name !== 'mobile-android',
      'Mobile menu test only runs on mobile'
    );

    await page.setViewportSize({ width: 412, height: 915 });
    await page.goto('/', { waitUntil: 'networkidle' });

    const navigation = page.getByRole('navigation');
    const mobileMenuButton = navigation.getByRole('button', {
      name: 'toggle navigation',
    });
    expect(mobileMenuButton).toBeVisible();

    await mobileMenuButton.click();
    await expect(page).toHaveScreenshot('mobile-menu.png');
  });
});

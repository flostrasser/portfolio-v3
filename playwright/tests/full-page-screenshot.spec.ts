import { expect, test } from '@playwright/test';
import { waitForImages } from './helpers/wait-for-images';

test.describe('Full page screenshot', () => {
  test('should match full page screenshot', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await waitForImages(page);
    await expect(page).toHaveScreenshot('full-page.png', { fullPage: true });
  });
});

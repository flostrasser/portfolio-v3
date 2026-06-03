import { expect, test } from '@playwright/test';

test.describe('Mobile menu', () => {
  test('should open the mobile menu when clicking the toggle button', async ({
    page,
  }, testInfo) => {
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

    expect(page.getByRole('navigation')).toBeVisible();
    await expect(page).toHaveScreenshot('mobile-menu.png');
  });
});

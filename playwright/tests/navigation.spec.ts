import { expect, test } from '@playwright/test';

test.describe('Navigation', () => {
  test('should scroll to projects section when clicking the projects nav item', async ({
    page,
  }, testInfo) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    const navigation = page.getByRole('navigation');

    if (testInfo.project.name === 'mobile-android') {
      await navigation
        .getByRole('button', { name: 'toggle navigation' })
        .click();
    }

    await navigation.getByRole('link', { name: 'Projects' }).click();

    await page.waitForFunction(() => {
      return new Promise((resolve) => {
        let lastScrollY = window.scrollY;
        const check = () => {
          if (window.scrollY === lastScrollY) {
            resolve(true);
          } else {
            lastScrollY = window.scrollY;
            requestAnimationFrame(check);
          }
        };
        requestAnimationFrame(check);
      });
    });

    const projectsHeadline = page.getByRole('heading', {
      level: 2,
      name: 'Projects',
    });

    await expect(projectsHeadline).toBeInViewport();
    await expect(page).toHaveScreenshot('scroll-to-projects.png');
  });

  test('should hide the navigation when scrolling down and show it when scrolling up', async ({
    page,
  }) => {
    await page.goto('/');

    const navigation = page.getByRole('navigation');
    await expect(navigation).toBeInViewport();

    await page.evaluate(() => window.scrollTo(0, 600));
    await expect(navigation).not.toBeInViewport();

    await page.evaluate(() => window.scrollTo(0, 500));
    await expect(navigation).toBeInViewport();
  });
});

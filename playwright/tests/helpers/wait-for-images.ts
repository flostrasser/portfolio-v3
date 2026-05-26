import { type Page } from '@playwright/test';

/**
 * @copyright https://github.com/microsoft/playwright/issues/19861#issuecomment-3969028317
 */
export async function waitForImages(page: Page): Promise<void> {
  // RC2 step 1: trigger lazy images that are already in the DOM
  await page.evaluate(() => {
    for (const img of document.querySelectorAll<HTMLImageElement>(
      'img[loading="lazy"]'
    )) {
      img.setAttribute('loading', 'eager');
    }
  });

  await page.evaluate(async () => {
    const imgs = [...document.querySelectorAll<HTMLImageElement>('img')];

    // RC2: img.decode() waits for fetch + decode (img.complete fires too early
    //      for decoding="async" images).
    // RC4: document.fonts.ready prevents font-swap reflow between frames.
    await Promise.all([
      ...imgs.map((img) => img.decode().catch(() => {})),
      document.fonts.ready,
    ]);

    // RC5: blur whatever the browser auto-focused on page load
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    // RC3: CSS columns/masonry layout reflows AFTER img.decode() resolves.
    // Double-rAF: first frame = layout scheduled, second = layout painted.
    // await new Promise<void>((r) =>
    //   requestAnimationFrame(() => requestAnimationFrame(r))
    // );
  });

  // Catch any secondary requests the image loads may have triggered
  await page.waitForLoadState('networkidle');
}

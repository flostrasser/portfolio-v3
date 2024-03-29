import '../scss/styles.scss';

function initNavbar() {
  const nav = document.querySelector('body > nav');
  if (!nav) return;
  const navbarToggler = nav.querySelector('button[aria-expanded]');
  const navLinks = nav.querySelectorAll('a');
  if (!navbarToggler || !navLinks) return;

  // toggle navbar when clicking on toggler button
  navbarToggler.addEventListener('click', () => {
    nav.classList.toggle('expanded');
    const isExpanded = navbarToggler.getAttribute('aria-expanded') === 'true';
    navbarToggler.setAttribute('aria-expanded', `${!isExpanded}`);
  });

  // close navbar when clicking on nav link
  navLinks.forEach((navLink) =>
    navLink.addEventListener('click', () => {
      nav.classList.remove('expanded');
      navbarToggler.setAttribute('aria-expanded', `${false}`);
    }),
  );

  // close navbar when clicking outside the nav
  window.addEventListener('click', (e) => {
    if (!document.querySelector('nav')?.contains(e.target as Element)) {
      nav.classList.remove('expanded');
      navbarToggler.setAttribute('aria-expanded', `${false}`);
    }
  });

  // hide navbar when scrolling down
  const scrollPosThreshold = 50;
  let prevScrollPos = document.documentElement.scrollTop;
  window.addEventListener('scroll', () => {
    const currentScrollPos = document.documentElement.scrollTop;
    const isBelowThreshold = currentScrollPos > scrollPosThreshold;
    const isNavbarExpanded = nav.classList.contains('expanded');
    const isPreventSlideUp = nav.classList.contains('no-slide-up');

    if (currentScrollPos > prevScrollPos && isBelowThreshold && !isNavbarExpanded && !isPreventSlideUp) {
      nav.classList.add('slide-up'); // hide
    } else if (currentScrollPos < prevScrollPos) {
      nav.classList.remove('slide-up'); // show
    }

    prevScrollPos = currentScrollPos;
  });
}

function initSmoothScrollToTarget() {
  const nav = document.querySelector('body > nav');
  if (!nav) return;
  const internalHashLinks = document.querySelectorAll<HTMLAnchorElement>('a[href^="/#"]');

  let noSlideUpCounter = 0;

  internalHashLinks.forEach((link) =>
    link.addEventListener('click', (e) => {
      const targetEl = document.querySelector((e.currentTarget as HTMLAnchorElement)?.hash || 'body');

      if (!targetEl) return;

      const offset = 35;
      const targetElPosTop = targetEl.getBoundingClientRect().top;
      const offsetPosition = targetElPosTop + document.documentElement.scrollTop - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      nav.classList.add('no-slide-up');
      noSlideUpCounter += 1;

      window.setTimeout(() => {
        if (noSlideUpCounter <= 1) {
          nav.classList.remove('no-slide-up');
        }

        noSlideUpCounter -= 1;
      }, 1000);

      e.preventDefault();
    }),
  );
}

function initEmailBtn() {
  const mailto = String('mailto:infoatflorianstrasserdotcom').replace('at', '@').replace('dot', '.');

  const sendMailBtn = document.querySelector('.send-mail-btn');

  sendMailBtn?.addEventListener('click', () => {
    window.location.href = mailto;
  });
}

initNavbar();
initSmoothScrollToTarget();
initEmailBtn();

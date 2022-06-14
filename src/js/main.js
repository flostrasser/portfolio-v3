import '../scss/styles.scss';

function initNavbar() {
  const header = document.querySelector('body > header');
  const navbarToggler = header.querySelector('button[aria-expanded]');
  const navLinks = header.querySelectorAll('a');

  // toggle navbar when clicking on toggler button
  navbarToggler.addEventListener('click', () => {
    header.classList.toggle('expanded');
    const isExpanded = navbarToggler.getAttribute('aria-expanded') === 'true';
    navbarToggler.setAttribute('aria-expanded', !isExpanded);
  });

  // close navbar when clicking on nav link
  navLinks.forEach((navLink) =>
    navLink.addEventListener('click', () => {
      header.classList.remove('expanded');
      navbarToggler.setAttribute('aria-expanded', false);
    })
  );

  // close navbar when clicking outside the nav
  window.addEventListener('click', (e) => {
    if (!document.querySelector('nav').contains(e.target)) {
      header.classList.remove('expanded');
      navbarToggler.setAttribute('aria-expanded', false);
    }
  });

  // hide navbar when scrolling down
  const scrollPosThreshold = 50;
  let prevScrollPos = document.documentElement.scrollTop;
  window.addEventListener('scroll', () => {
    const currentScrollPos = document.documentElement.scrollTop;
    const isBelowThreshold = currentScrollPos > scrollPosThreshold;
    const isNavbarExpanded = header.classList.contains('expanded');
    const isPreventSlideUp = header.classList.contains('no-slide-up');

    if (currentScrollPos > prevScrollPos && isBelowThreshold && !isNavbarExpanded && !isPreventSlideUp) {
      header.classList.add('slide-up'); // hide
    } else if (currentScrollPos < prevScrollPos) {
      header.classList.remove('slide-up'); // show
    }

    prevScrollPos = currentScrollPos;
  });
}

function initSmoothScrollToTarget() {
  const header = document.querySelector('body > header');
  const internalHashLinks = document.querySelectorAll('a[href^="/#"]');

  let noSlideUpCounter = 0;

  internalHashLinks.forEach((link) =>
    link.addEventListener('click', (e) => {
      // TODO: remove everything not related to no-slide-up? (scroll with css smooth scrolling -> focus does'nt stay in nav though)
      const targetEl = document.querySelector(e.currentTarget.hash || 'body');

      if (!targetEl) return;

      const offset = 35;
      const targetElPosTop = targetEl.getBoundingClientRect().top;
      const offsetPosition = targetElPosTop + document.documentElement.scrollTop - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      header.classList.add('no-slide-up');
      noSlideUpCounter += 1;

      window.setTimeout(() => {
        if (noSlideUpCounter <= 1) {
          header.classList.remove('no-slide-up');
        }

        noSlideUpCounter -= 1;
      }, 1000);

      // TODO: prevent page jumping in Chrome
      // move focus to the target element
      // window.setTimeout(() => {
      //   targetEl.focus();
      // }, 2000);

      e.preventDefault();
    })
  );
}

function initEmailBtn() {
  const mailto = String('mailto:infoatflorianstrasserdotcom').replace('at', '@').replace('dot', '.');

  const sendMailBtn = document.querySelector('.send-mail-btn');

  sendMailBtn.addEventListener('click', () => {
    window.location.href = mailto;
  });
}

initNavbar();
initSmoothScrollToTarget();
initEmailBtn();

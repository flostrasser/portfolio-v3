import '../scss/styles.scss';

initNavbar();

function initNavbar() {
    const nav = document.querySelector('body > nav');
    const navbarToggler = nav.querySelector('button[aria-expanded]');
    const navLinks = nav.querySelectorAll('a');

    // toggle navbar when clicking on toggler button
    navbarToggler.addEventListener('click', e => {
        nav.classList.toggle('expanded');
        const isExpanded = navbarToggler.getAttribute('aria-expanded') === 'true';
        navbarToggler.setAttribute('aria-expanded', !isExpanded);
    });

    // close navbar when clicking on nav link
    navLinks.forEach(navLink => navLink.addEventListener('click', e => {
        nav.classList.remove('expanded');
        navbarToggler.setAttribute('aria-expanded', false);

        // scroll element into view
        smoothScrollIntoView(e);
    }));

    // close navbar when clicking outside the nav
    window.addEventListener('click', e => {
        if (!document.querySelector('nav').contains(e.target)) {
            nav.classList.remove('expanded');
            navbarToggler.setAttribute('aria-expanded', false);
        }
    });

    // hide navbar when scrolling down
    const scrollPosThreshold = 50;
    let prevScrollPos = document.documentElement.scrollTop;
    window.addEventListener('scroll', e => {
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

let noSlideUpCounter = 0;

function smoothScrollIntoView(e) {
    const nav = document.querySelector('body > nav');
    const targetEl = document.querySelector(e.currentTarget.hash || 'body');

    if (!targetEl) return;

    targetEl.scrollIntoView({
        behavior: "smooth"
    });

    nav.classList.add('no-slide-up');
    noSlideUpCounter++;

    window.setTimeout(() => {
        if (noSlideUpCounter <= 1) {
            nav.classList.remove('no-slide-up');
        }

        noSlideUpCounter--;
    }, 1000);

    e.preventDefault();
}
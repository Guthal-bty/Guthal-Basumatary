const menuIcon = document.querySelector('.menu-icon');
const navMenu = document.querySelector('nav ul');

// Toggle menu visibility on icon click
menuIcon.addEventListener('click', (e) => {
  e.stopPropagation();
  navMenu.classList.toggle('show');
});


window.addEventListener('click', (e) => {
  const isMobile = window.innerWidth <= 991;
  const clickedOutside = !navMenu.contains(e.target) && !menuIcon.contains(e.target);

  if (isMobile && navMenu.classList.contains('show') && clickedOutside) {
    navMenu.classList.remove('show');
  }
});

// Optional: Re-enable menu toggle on icon if it was disabled by previous click
window.addEventListener('resize', () => {
  if (window.innerWidth > 991 && navMenu.classList.contains('show')) {
    navMenu.classList.remove('show');
  }
});

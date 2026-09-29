"use strict";
const controls = document.querySelector('.publication-controls');
const filterButtons = [...document.querySelectorAll('[data-filter]')];
const publications = [...document.querySelectorAll('.publication')];
const search = document.querySelector('#publication-search');
const count = document.querySelector('#results-count');
const empty = document.querySelector('.empty-state');
let activeType = 'all';
function filterPublications() {
  const query = search.value.trim().toLocaleLowerCase();
  let visible = 0;
  publications.forEach(publication => {
    const matchesType = activeType === 'all' || publication.dataset.type === activeType;
    const matchesText = publication.textContent.toLocaleLowerCase().includes(query);
    publication.hidden = !(matchesType && matchesText);
    if (!publication.hidden) visible += 1;
  });
  count.textContent = visible + (visible === 1 ? ' work' : ' works') + ' · newest first';
  empty.hidden = visible !== 0;
}
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    activeType = button.dataset.filter;
    filterButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    filterPublications();
  });
});
search.addEventListener('input', filterPublications);
controls.hidden = false;
const revealEmail = document.querySelector('#show-email');
const emailDetails = document.querySelector('#email-details');
const emailAddress = document.querySelector('#email-address');
const emailStatus = document.querySelector('#email-status');
revealEmail.hidden = false;
revealEmail.addEventListener('click', () => {
  if (revealEmail.getAttribute('aria-expanded') === 'true') {
    emailDetails.hidden = true;
    emailAddress.textContent = '';
    emailAddress.removeAttribute('href');
    emailStatus.textContent = '';
    revealEmail.setAttribute('aria-expanded', 'false');
    revealEmail.setAttribute('aria-label', 'Show email address');
    return;
  }
  // Deters simple address collectors; this is not a security boundary.
  const address = ['ismail.guennouni', 'iwr.uni-heidelberg.de'].join('@');
  emailAddress.textContent = address;
  emailAddress.href = 'mailto:' + address;
  emailDetails.hidden = false;
  revealEmail.setAttribute('aria-expanded', 'true');
  revealEmail.setAttribute('aria-label', 'Hide email address');
  emailAddress.focus();
});
document.querySelector('#copy-email').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(emailAddress.textContent);
    emailStatus.textContent = 'Address copied';
  } catch {
    emailStatus.textContent = 'Please select the address above to copy it.';
  }
});
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#nav-links');
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  navigation.classList.toggle('open', !expanded);
});
navigation.addEventListener('click', (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    menuButton.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('open');
  }
});

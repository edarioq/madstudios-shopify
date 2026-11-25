/*
  MAD Studios series landing pages: signup form.
  - Validates email and consent with plain-language messages.
  - Adds the chosen-piece tag to the Shopify customer tags before submit.
  - Moves focus to the thank-you message after a successful signup.
  No third-party code. Nothing is stored in the browser.
*/
(function () {
  'use strict';

  var form = document.getElementById('sf-signup');

  var thanks = document.querySelector('[data-sf-thanks]');
  if (thanks) {
    var section = document.getElementById('sf-event');
    if (section) section.scrollIntoView({ block: 'start' });
    thanks.focus({ preventScroll: true });
  }

  if (!form) return;
  var tagsInput = form.querySelector('[data-sf-tags]');
  if (!tagsInput) return;

  form.noValidate = true;

  var email = form.querySelector('#sf-email');
  var consent = form.querySelector('#sf-consent');
  var emailError = form.querySelector('#sf-email-error');
  var consentError = form.querySelector('#sf-consent-error');
  var fav = form.querySelector('[data-sf-fav]');
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function cleanTag(value) {
    return String(value || '')
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 60);
  }

  form.addEventListener('submit', function (event) {
    var emailValue = email ? email.value.trim() : '';
    var emailOk = emailPattern.test(emailValue);
    var consentOk = consent ? consent.checked : true;

    if (email) email.setAttribute('aria-invalid', String(!emailOk));
    if (emailError) {
      emailError.textContent = emailOk ? '' : (emailValue ? 'Enter a full email address, like name@email.com.' : 'Enter your email so we can send the invite.');
    }
    if (consent) consent.setAttribute('aria-invalid', String(!consentOk));
    if (consentError) {
      consentError.textContent = consentOk ? '' : 'Check the box so we have your permission to email you.';
    }

    if (!emailOk || !consentOk) {
      event.preventDefault();
      (emailOk ? consent : email).focus();
      return;
    }

    var tags = [tagsInput.getAttribute('data-sf-base')];
    if (fav && fav.value) tags.push('resonated-' + cleanTag(fav.value));
    tagsInput.value = tags.join(', ');
  });
})();

// main.js - plain JavaScript (no libraries) added to the original page.

// 1) Login box: opens/closes when you click the "login" button.
//    Before, it only opened on mouse hover (CSS), which does not work on phones.
var loginBtn = document.querySelector('.btnlgn');
var loginBox = document.querySelector('.login-box');
if (loginBtn && loginBox) {
  loginBtn.addEventListener('click', function () {
    loginBox.classList.toggle('open');   // adds/removes the class "open"
  });
}

// 2) Back-to-top button: shows after scrolling down 300px, scrolls up smoothly on click.
var toTop = document.getElementById('to-top');
if (toTop) {
  window.addEventListener('scroll', function () {
    toTop.style.display = window.scrollY > 300 ? 'block' : 'none';
  });
  toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// 3) Contact form check: makes sure name, email and message are filled
//    before showing a "sent" message. (It does not send anything to a server;
//    that would need a backend.)
var sendBtn = document.getElementById('c-send');
if (sendBtn) {
  sendBtn.addEventListener('click', function () {
    var name = document.getElementById('c-name').value.trim();
    var email = document.getElementById('c-email').value.trim();
    var msg = document.getElementById('c-msg').value.trim();
    var status = document.getElementById('c-status');
    var emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);   // simple email pattern

    if (!name || !msg) {
      status.textContent = 'Please fill in your name and message.';
      status.className = 'err';
    } else if (!emailOk) {
      status.textContent = 'Please enter a valid email.';
      status.className = 'err';
    } else {
      status.textContent = 'Thanks ' + name + ', your message is ready to send!';
      status.className = 'ok';
    }
  });
}

// 4) Cart counter in the navbar (on both pages).
//    The cart is saved in localStorage by the React app. Here we only READ it and show the number.
function updateNavCount() {
  var count = 0;
  try {
    (JSON.parse(localStorage.getItem('alaa_shop_cart')) || []).forEach(function (l) { count += l.qty; });
  } catch (e) { /* no saved cart */ }
  document.querySelectorAll('.nav-count').forEach(function (el) { el.textContent = count; });
}
updateNavCount();
window.addEventListener('cart-changed', updateNavCount);   // React fires this event when the cart changes

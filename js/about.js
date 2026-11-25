// about.js - plain JavaScript for about.html: tabs, FAQ accordion, animated number counters.

// 1) Tabs: click a tab button -> show its panel, hide the others.
document.querySelectorAll('.tab-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
    document.querySelectorAll('.tab-panel').forEach(function (p) { p.classList.remove('active'); });
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
  });
});

// 2) FAQ accordion: click a question to open its answer (and close the others).
document.querySelectorAll('.faq-q').forEach(function (q) {
  q.addEventListener('click', function () {
    var item = q.parentElement;
    var wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('open'); });
    if (!wasOpen) item.classList.add('open');
  });
});

// 3) Number counters: count up from 0 to data-target when the numbers become visible.
//    IntersectionObserver tells us when an element enters the screen.
function countUp(el) {
  var target = Number(el.dataset.target), current = 0;
  var step = Math.max(1, Math.round(target / 60));
  var timer = setInterval(function () {
    current = Math.min(target, current + step);
    el.textContent = current;
    if (current >= target) clearInterval(timer);
  }, 20);
}
var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) { countUp(entry.target); observer.unobserve(entry.target); }
  });
});
document.querySelectorAll('.stat').forEach(function (el) { observer.observe(el); });

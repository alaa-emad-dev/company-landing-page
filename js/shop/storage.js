// storage.js - saves the cart in the browser (localStorage) so it is still there after refresh.
// try/catch: some browsers block localStorage, and the page must still work.
window.Shop = window.Shop || {};
(function () {
  var KEY = 'alaa_shop_cart';

  // Cart format: [{ id: 1, qty: 2 }, { id: 5, qty: 1 }]
  Shop.loadCart = function () {
    try {
      var data = JSON.parse(localStorage.getItem(KEY));
      return Array.isArray(data) ? data : [];
    } catch (e) { return []; }
  };

  Shop.saveCart = function (cart) {
    try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) { /* ignore */ }
    window.dispatchEvent(new Event('cart-changed'));   // tells the navbar counter (main.js) to update
  };

  // Helper used by the cart: total price and number of items.
  Shop.cartTotals = function (cart) {
    var total = 0, count = 0;
    cart.forEach(function (line) {
      var p = Shop.PRODUCTS.filter(function (x) { return x.id === line.id; })[0];
      if (p) { total += p.price * line.qty; count += line.qty; }
    });
    return { total: total, count: count };
  };
})();

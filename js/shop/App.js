// App.js - the main React component. It owns the STATE (data that changes) and passes it down to the other components.
// State: filters (search/sort/...), cart, which popup is open.
window.Shop = window.Shop || {};
(function () {
  var h = React.createElement;
  var useState = React.useState;

  Shop.App = function () {
    var f = useState({ search: '', category: 'all', maxPrice: 400, sort: 'default' });
    var filters = f[0], setFilters = f[1];
    var c = useState(Shop.loadCart);            // starts from what is saved in localStorage
    var cart = c[0], setCart = c[1];
    var v = useState(null);                     // null | 'cart' | 'checkout' | a product object
    var view = v[0], setView = v[1];

    // Every time the cart changes, save it. (useEffect = "do this after something changed")
    React.useEffect(function () { Shop.saveCart(cart); }, [cart]);

    // --- cart actions: each makes a NEW array (React needs a new array to notice the change) ---
    // We pass a function to setCart ("take the latest cart, return the new one"), so quick clicks never lose an update.
    function addToCart(id) {
      setCart(function (cart) {
        var exists = cart.some(function (l) { return l.id === id; });
        return exists
          ? cart.map(function (l) { return l.id === id ? { id: id, qty: Math.min(l.qty + 1, 20) } : l; })
          : cart.concat([{ id: id, qty: 1 }]);
      });
    }
    function setQty(id, qty) {
      if (qty < 1) return removeFromCart(id);
      setCart(function (cart) {
        return cart.map(function (l) { return l.id === id ? { id: id, qty: Math.min(qty, 20) } : l; });
      });
    }
    function removeFromCart(id) {
      setCart(function (cart) { return cart.filter(function (l) { return l.id !== id; }); });
    }

    // --- filter + sort the list ---
    var list = Shop.PRODUCTS.filter(function (p) {
      return p.name.toLowerCase().indexOf(filters.search.toLowerCase()) !== -1 &&
             (filters.category === 'all' || p.category === filters.category) &&
             p.price <= Number(filters.maxPrice);
    });
    list = list.slice().sort(function (a, b) {
      if (filters.sort === 'low') return a.price - b.price;
      if (filters.sort === 'high') return b.price - a.price;
      if (filters.sort === 'rating') return b.rating - a.rating;
      if (filters.sort === 'name') return a.name.localeCompare(b.name);
      return a.id - b.id;
    });

    var totals = Shop.cartTotals(cart);
    function close() { setView(null); }

    return h('div', { id: 'products' },
      h(Shop.Toolbar, { filters: filters, onChange: setFilters, count: totals.count, total: totals.total, onOpenCart: function () { setView('cart'); } }),
      h('p', { className: 'shop-count' }, 'Showing ' + list.length + ' of ' + Shop.PRODUCTS.length + ' products'),
      h('div', { className: 'row' },
        list.map(function (p) {
          return h(Shop.ProductCard, {
            key: p.id, product: p, onAdd: addToCart, onDetails: setView,
            inCart: cart.some(function (l) { return l.id === p.id; })
          });
        })),
      list.length === 0 ? h('p', { className: 'cntr' }, 'No products match your filters.') : null,

      view && view.id ? h(Shop.ProductModal, { product: view, onAdd: addToCart, onClose: close }) : null,
      view === 'cart' ? h(Shop.CartPanel, { cart: cart, total: totals.total, onQty: setQty, onRemove: removeFromCart,
        onClear: function () { setCart([]); }, onCheckout: function () { setView('checkout'); }, onClose: close }) : null,
      view === 'checkout' ? h(Shop.Checkout, { cart: cart, total: totals.total, onDone: function () { setCart([]); }, onClose: close }) : null
    );
  };
})();

// CartPanel.js - React component: the cart drawer. Change quantity (+ / -), remove an item, clear all, go to checkout.
window.Shop = window.Shop || {};
(function () {
  var h = React.createElement;

  Shop.CartPanel = function (props) {
    var lines = props.cart.map(function (line) {
      return { line: line, product: Shop.PRODUCTS.filter(function (p) { return p.id === line.id; })[0] };
    }).filter(function (x) { return x.product; });

    return h('div', { className: 'shop-overlay', onClick: props.onClose },
      h('div', { className: 'shop-drawer', onClick: function (e) { e.stopPropagation(); } },
        h('button', { type: 'button', className: 'shop-x', onClick: props.onClose, 'aria-label': 'Close' }, '\u00d7'),
        h('h2', null, 'Your cart'),
        lines.length === 0 ? h('p', null, 'Your cart is empty.') : null,
        lines.map(function (x) {
          var p = x.product, q = x.line.qty;
          return h('div', { className: 'shop-line', key: p.id },
            h('img', { src: p.image, alt: '' }),
            h('div', { className: 'shop-line-info' },
              h('strong', null, p.name),
              h('div', null, p.price + ' LE x ' + q + ' = ' + (p.price * q) + ' LE'),
              h('div', null,
                h('button', { type: 'button', className: 'shop-qty', onClick: function () { props.onQty(p.id, q - 1); } }, '\u2212'),
                h('span', { className: 'shop-q' }, q),
                h('button', { type: 'button', className: 'shop-qty', onClick: function () { props.onQty(p.id, q + 1); } }, '+'),
                h('button', { type: 'button', className: 'shop-remove', onClick: function () { props.onRemove(p.id); } }, 'Remove'))));
        }),
        lines.length > 0 ? h('div', null,
          h('p', { className: 'shop-big' }, 'Total: ' + props.total + ' LE'),
          h('button', { type: 'button', onClick: props.onCheckout }, 'Checkout'), ' ',
          h('button', { type: 'button', className: 'shop-btn-light', onClick: props.onClear }, 'Clear cart')) : null
      )
    );
  };
})();

// ProductModal.js - React component: the "Details" popup. Closes with the X, a click outside, or the Esc key.
window.Shop = window.Shop || {};
(function () {
  var h = React.createElement;

  Shop.ProductModal = function (props) {
    var p = props.product;

    // useEffect runs after the component shows. Here: listen for the Esc key, and stop listening when it closes.
    React.useEffect(function () {
      function onKey(e) { if (e.key === 'Escape') props.onClose(); }
      document.addEventListener('keydown', onKey);
      return function () { document.removeEventListener('keydown', onKey); };
    }, []);

    return h('div', { className: 'shop-overlay', onClick: props.onClose },
      h('div', { className: 'shop-modal', role: 'dialog', 'aria-label': p.name, onClick: function (e) { e.stopPropagation(); } },
        h('button', { type: 'button', className: 'shop-x', onClick: props.onClose, 'aria-label': 'Close' }, '\u00d7'),
        h('img', { src: p.image, alt: p.name }),
        h('h2', null, p.name),
        h('p', { className: 'shop-stars' }, Shop.stars(p.rating) + ' ' + p.rating + ' | ' + p.category),
        h('p', null, p.desc),
        h('p', { className: 'shop-big' }, p.price + ' LE ', h('del', null, p.oldPrice + ' LE')),
        h('button', { type: 'button', onClick: function () { props.onAdd(p.id); props.onClose(); } }, 'Add to cart')
      )
    );
  };
})();

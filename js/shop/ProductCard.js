// ProductCard.js - React component: ONE product card (image, name, price, stars, buttons).
window.Shop = window.Shop || {};
(function () {
  var h = React.createElement;

  // Turns a rating like 4.2 into stars: ★★★★☆
  Shop.stars = function (rating) {
    var full = Math.round(rating);
    return '\u2605'.repeat(full) + '\u2606'.repeat(5 - full);
  };

  Shop.ProductCard = function (props) {
    var p = props.product;
    var discount = Math.round((1 - p.price / p.oldPrice) * 100);   // % discount, calculated from the prices
    return h('div', { className: 'col-lg-3 col-md-4 col-sm-6 col-xs-12 card-pro' },
      h('img', { src: p.image, alt: p.name, className: 'imgpro', onClick: function () { props.onDetails(p); } }),
      h('h1', null, p.name),
      h('p', { className: 'shop-stars' }, Shop.stars(p.rating) + ' ' + p.rating),
      h('p', null, 'Price ' + p.price + ' LE ', h('del', null, p.oldPrice + ' LE '), h('span', { className: 'shop-off' }, '-' + discount + '%')),
      h('button', { type: 'button', className: 'shop-btn-light', onClick: function () { props.onDetails(p); } }, 'Details'),
      ' ',
      h('button', { type: 'button', className: props.inCart ? 'added' : '', onClick: function () { props.onAdd(p.id); } },
        props.inCart ? 'Added \u2713 (+1)' : 'Add to cart')
    );
  };
})();

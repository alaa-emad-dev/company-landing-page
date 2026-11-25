// Toolbar.js - React component: search box, category filter, max price, sort, and the cart button.
// It does not keep data itself. App.js gives it the values and the functions to change them (props).
window.Shop = window.Shop || {};
(function () {
  var h = React.createElement;

  Shop.Toolbar = function (props) {
    var f = props.filters;
    function set(name) {
      return function (e) {
        var next = Object.assign({}, f);   // copy, then change one value
        next[name] = e.target.value;
        props.onChange(next);
      };
    }
    return h('div', { className: 'shop-toolbar' },
      h('input', { type: 'text', placeholder: 'Search products...', value: f.search, onChange: set('search'), 'aria-label': 'Search' }),
      h('select', { value: f.category, onChange: set('category'), 'aria-label': 'Category' },
        h('option', { value: 'all' }, 'All categories'),
        h('option', { value: 'Monitors' }, 'Monitors'),
        h('option', { value: 'Laptops' }, 'Laptops')),
      h('label', { className: 'shop-price' }, 'Max price: ' + f.maxPrice + ' LE',
        h('input', { type: 'range', min: 50, max: 400, step: 10, value: f.maxPrice, onChange: set('maxPrice') })),
      h('select', { value: f.sort, onChange: set('sort'), 'aria-label': 'Sort' },
        h('option', { value: 'default' }, 'Sort: default'),
        h('option', { value: 'low' }, 'Price: low to high'),
        h('option', { value: 'high' }, 'Price: high to low'),
        h('option', { value: 'rating' }, 'Best rated'),
        h('option', { value: 'name' }, 'Name A-Z')),
      h('button', { type: 'button', className: 'cart-badge', onClick: props.onOpenCart },
        'Cart: ' + props.count + ' items | ' + props.total + ' LE')
    );
  };
})();

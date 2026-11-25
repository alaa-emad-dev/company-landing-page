// Checkout.js - React component: order summary + form with validation.
// Nothing is sent anywhere (no server). When the form is valid it shows an order number and empties the cart.
window.Shop = window.Shop || {};
(function () {
  var h = React.createElement;

  // Pure function: takes the form values, returns an object of error messages (empty object = all good).
  Shop.validate = function (v) {
    var errors = {};
    if (v.name.trim().length < 3) errors.name = 'Please write your full name (3 letters or more).';
    if (!/^01[0125][0-9]{8}$/.test(v.phone.trim())) errors.phone = 'Egyptian mobile number: 11 digits starting with 010, 011, 012 or 015.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email.trim())) errors.email = 'Please write a valid email.';
    if (v.address.trim().length < 8) errors.address = 'Please write your full address.';
    return errors;
  };

  Shop.Checkout = function (props) {
    var s = React.useState({ name: '', phone: '', email: '', address: '', payment: 'cash' });
    var values = s[0], setValues = s[1];
    var e = React.useState({});
    var errors = e[0], setErrors = e[1];
    var o = React.useState(null);
    var order = o[0], setOrder = o[1];

    function field(name, label, type) {
      return h('div', { className: 'shop-field' },
        h('label', null, label),
        h('input', {
          type: type || 'text', value: values[name], className: errors[name] ? 'bad' : '',
          onChange: function (ev) { var n = Object.assign({}, values); n[name] = ev.target.value; setValues(n); }
        }),
        errors[name] ? h('small', { className: 'shop-err' }, errors[name]) : null);
    }

    function submit() {
      var errs = Shop.validate(values);
      setErrors(errs);
      if (Object.keys(errs).length === 0) {
        setOrder({ number: 'AE-' + Date.now().toString().slice(-6), total: props.total, name: values.name.trim() });
        props.onDone();   // App empties the cart
      }
    }

    if (order) {
      return h('div', { className: 'shop-overlay', onClick: props.onClose },
        h('div', { className: 'shop-modal', onClick: function (ev) { ev.stopPropagation(); } },
          h('h2', null, 'Thank you, ' + order.name + '!'),
          h('p', null, 'Your order number is ', h('strong', null, order.number)),
          h('p', null, 'Total: ' + order.total + ' LE'),
          h('p', null, '(This is a demo page, so no real order was sent.)'),
          h('button', { type: 'button', onClick: props.onClose }, 'Close')));
    }

    var lines = props.cart.map(function (l) {
      var p = Shop.PRODUCTS.filter(function (x) { return x.id === l.id; })[0];
      return p ? h('li', { key: p.id }, p.name + ' x ' + l.qty + ' = ' + (p.price * l.qty) + ' LE') : null;
    });

    return h('div', { className: 'shop-overlay', onClick: props.onClose },
      h('div', { className: 'shop-modal shop-wide', onClick: function (ev) { ev.stopPropagation(); } },
        h('button', { type: 'button', className: 'shop-x', onClick: props.onClose, 'aria-label': 'Close' }, '\u00d7'),
        h('h2', null, 'Checkout'),
        h('ul', { className: 'shop-summary' }, lines),
        h('p', { className: 'shop-big' }, 'Total: ' + props.total + ' LE'),
        field('name', 'Full name'),
        field('phone', 'Mobile number'),
        field('email', 'Email', 'email'),
        field('address', 'Address'),
        h('div', { className: 'shop-field' },
          h('label', null, 'Payment'),
          h('select', { value: values.payment, onChange: function (ev) { var n = Object.assign({}, values); n.payment = ev.target.value; setValues(n); } },
            h('option', { value: 'cash' }, 'Cash on delivery'),
            h('option', { value: 'card' }, 'Card on delivery'))),
        h('button', { type: 'button', onClick: submit }, 'Place order')));
  };
})();

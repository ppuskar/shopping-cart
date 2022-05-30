var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var Product = require('../models/product');
const { route } = require('./user');
var Order = require('../models/order');
/* GET home page. */
router.get('/', function (req, res, next) {

  Product.find({}).lean().exec(function (err, docs) {
    res.render('shop/index', { title: 'Shopping cart', products: docs });
  });


});

router.get('/add-to-cart/:id', function (req, res, next) {
  console.log('incming request :%j', req.params);
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  console.log('got product req with id :' + productId);
  Product.findById(productId, function (err, product) {
    if (err) {
      return res.redirect('/');
    }

    cart.add(product, product.id);
    req.session.cart = cart;
    console.log('cart : %j', cart);
    res.redirect('/');
  });
});

router.get('/shopping-cart', function (req, res, next) {

  if (!req.session.cart) {
    return res.render('shop/shopping-cart', { products: null });
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/shopping-cart',
    {
      products: cart.generateArray(),
      totalPrice: cart.totalPrice
    });
});


router.get('/checkout', function (req, res, next) {
  if (!req.session.cart) {
    return res.redirect('/shopping-cart');
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/checkout',
    {
      products: cart.generateArray(),
      totalPrice: cart.totalPrice,
      totalQuantity: cart.totalQuantity
    });
});


router.post('/checkout', function (req, res, next) {
  if (!req.session.cart) {
    return res.redirect('/shopping-cart');
  }
  var cart = new Cart(req.session.cart);


var order=new Order({
  user: req.user,
  cart: cart,
  address: "422, default address, pin 1060tt"
});
  res.render('shop/checkout',
    {
      products: cart.generateArray(),
      totalPrice: cart.totalPrice
    });
});

module.exports = router;

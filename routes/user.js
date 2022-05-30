var express = require('express');
var passport = require('passport');
var flash = require('connect-flash');
var csrf = require('csurf');
const { check, validationResult } = require('express-validator');



const { route } = require('../app');
const router = express.Router();


router.get('/profile', isLoggedIn, function (req, res, next) {
    console.log('get call token :' + req.csrfToken());
    res.render('user/profile');
});

router.get('/logout', isLoggedIn, function (req, res, next) {
    req.logOut();
    res.redirect('/');
});


router.use('/', notLoggedIn, function (req, res, next) {
    next();
});
router.get('/signup', function (req, res, next) {
    console.log('get call token :' + req.csrfToken());

    var messages = req.flash('error');
    console.log('got total ' + messages.length + ' errors : ' + messages);
    res.render('user/signup', { csrfToken: req.csrfToken(), messages: messages, hasError: messages.length > 0 ? true : false });
});

router.post('/signup', [
    check('email').notEmpty().isEmail(),
    check('password').notEmpty().isLength({ min: 4 })
], function (req, res, next) {
    var errors = validationResult(req);
    console.log('check errors :' + errors.isEmpty());
    if (!errors.isEmpty()) {
        var messages = [];
        errors.array().forEach(element => {
            messages.push(element.msg + ' for ' + element.param);
            console.log(element.msg + ' for ' + element.param);
        });
        req.flash('error', messages);
        return res.redirect('signup');
    }


    passport.authenticate('local.signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    })(req, res, next);
});



router.get('/signin', function (req, res, next) {
    console.log('get call token :' + req.csrfToken());

    var messages = req.flash('error');
    console.log('got total ' + messages.length + ' errors : ' + messages);
    res.render('user/signin', { csrfToken: req.csrfToken(), messages: messages, hasError: messages.length > 0 ? true : false });
});


router.post('/signin', [
    check('email').notEmpty().isEmail(),
    check('password').notEmpty()
], function (req, res, next) {
    var errors = validationResult(req);
    console.log('check errors :' + errors.isEmpty());
    if (!errors.isEmpty()) {
        var messages = [];
        errors.array().forEach(element => {
            messages.push(element.msg + ' for ' + element.param);
            console.log(element.msg + ' for ' + element.param);
        });
        req.flash('error', messages);
        return res.redirect('signin');
    }


    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);

});

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/')
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/')
}


var passsport = require('passport');
var User = require('../models/user');
const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

const { check, validationResult } = require('express-validator');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password', passReqToCallback: true
}, function (req, email, password, done) {

    console.log('Got into passport control.');
    User.findOne({ 'email': email }, function (err, user) {
        console.log('pasport: check if already exist.');
        if (err) {
            console.log('pasport: It was an error though.');
            return done(err);
        }
        if (user) {
            console.log('pasport: Yes  user already exist.');
            return done(null, false, { message: 'Email is already in use.' });
        }
        console.log('pasport: Creating new user.');
        var newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.save(function (err, result) {
            console.log('pasport: Tried save.');
            if (err) {
                console.log('pasport: Error saving.');
                return done(err);
            }
            console.log('pasport: Saved sucessfully.');
            return done(null, newUser);
        });
    });
}));

passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {

    User.findOne({ 'email': email }, function (err, user) {
        console.log('pasport/signin: check if user exist.');
        if (err) {
            console.log('passport/signin: It was an error though.');
            return done(err);
        }
        if (!user) {
            console.log('pasport/signin: No  user doesn not exist.');
            return done(null, false, { message: 'No user found.' });
        }
        if (!user.validPassword(password)) {
            return done(null, false, { message: 'Wrong password.' });
        }
        return done(null, user);

    });

}));
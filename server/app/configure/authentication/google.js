'use strict';

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');

module.exports = function (app) {

    var googleConfig = app.getValue('env').GOOGLE;

    var googleCredentials = {
        // clientID: '1022144965124-7acplp6tv2p1lno54gop52fge06ui9f9.apps.googleusercontent.com',
        // clientSecret: 'vcguMJG5mj-WZzS0bpgmCEIF',
        // callbackURL: 'http://127.0.0.1:8080/auth/google/callback'
        clientID: googleConfig.clientID,
        clientSecret: googleConfig.clientSecret,
        callbackURL: googleConfig.callbackURL
    };

    var verifyCallback = function (accessToken, refreshToken, profile, done) {
        console.log('hey', profile)
        UserModel.findOne({ 'google.id': profile.id }).exec()
            .then(function (user) {
                if (user) {
                    return user;
                } else {
                    return UserModel.create({
                        email: profile.emails[0],
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,

                        google: {
                            id: profile.id
                        }
                    });
                }

            }).then(function (userToLogin) {
                done(null, userToLogin);
            }, function (err) {
                console.error('Error creating user from Google authentication', err);
                done(err);
            });

    };

    passport.use(new GoogleStrategy(googleCredentials, verifyCallback));

    app.get('/auth/google', passport.authenticate('google', {
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }));

    app.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/login' }),
        function (req, res) {
            console.log('here')
            res.redirect('/');
        });

};

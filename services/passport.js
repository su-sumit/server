const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github').Strategy;
const passport = require('passport');
const mongoose = require('mongoose');
const keys = require('../config/keys');

const Users = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    Users.findById(id).then( user => {
        done(null, user);
    });
});

passport.use(new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        },
        (accessToken, refreshToken, profile, done) => {
            Users.findOne({ 'email': profile.emails[0].value })
            .then( existingUser => {
                if(existingUser && existingUser.accounts.google.id){
                    return done(null, existingUser);
                }else if(existingUser && !existingUser.accounts.google.id){
                    existingUser.accounts.google.id= profile.id;
                    existingUser.save()
                    .then(user => done(null, user));
                }else{
                    new Users({
                        'email': profile.emails[0].value,
                        'accounts.google.id': profile.id
                    })
                    .save()
                    .then(user => done(null, user));
                }
            }).catch( error => {
              done(error)
            });
        }
    )
);

passport.use(new GithubStrategy(
        {
            clientID: keys.githubClientID,
            clientSecret: keys.githubClientSecret,
            callbackURL: '/auth/github/callback',
            proxy: true
        },
        (accessToken, refreshToken, profile, done) => {
            Users.findOne({ 'email': profile.emails[0].value })
            .then( existingUser => {
                if(existingUser && existingUser.accounts.github.id){
                    return done(null, existingUser);
                }else if(existingUser && !existingUser.accounts.github.id){
                    existingUser.accounts.github.id = profile.id;
                    existingUser.save()
                    .then(user => done(null, user));
                }else{
                    new Users({
                        'email': profile.emails[0].value,
                        'accounts.github.id': profile.id
                    })
                    .save()
                    .then(user => done(null, user));
                }
            }).catch( error => {
              done(error)
            });
        }
    )
);

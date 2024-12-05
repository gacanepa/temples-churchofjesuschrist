import dotenv from 'dotenv';
import express from 'express';
import passport from 'passport';
import session from 'express-session';
import Strategy from 'passport-github2';

import connect from './data/database.js';
import docsRoutes from './routes/docs.js';
import indexRoutes from './routes/index.js';
import templesRoutes from './routes/temples.js';

import User from './models/User.js';

const app = express();

dotenv.config();

// Hide internal technical information
app.disable('x-powered-by');

// Request bodies will be sent as JSON
app.use(express.json());

/*
Session configuration is required for Passport.js to work.
- session: middleware that will store the user's information in the session.
- secret: =secret key that will be used to encrypt the session.
- resave: determines whether the session should be saved to the session store on every request.
- saveUninitialized: indicates whether a session should be saved to the session store even if it is empty.
*/
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Passport.js configuration
app.use(passport.initialize());
app.use(passport.session());

passport.use(new Strategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const user = await User.findOne({ githubId: profile.id });

    if (!user) {
      const newUser = new User({
        githubId: profile.id,
        username: profile.username,
        displayName: profile.displayName,
        profileUrl: profile.profileUrl,
      });
  
      await newUser.save();
      return done(null, newUser);
    }
    done(null, profile);
  } catch (error) {
    return done(error);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

app.get('/', (req, res) => res.send(req.session.user !== undefined
  ? `Hello, ${req.session.user.displayName}`
  : 'Logged out'));
app.get('/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/docs',
    session: false,
  }), (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  });

const port = process.env.PORT || 3001;

app.use('/', indexRoutes);
app.use('/temples', templesRoutes);
app.use('/docs', docsRoutes);

app.listen(port, async () => {
  await connect(process.env.MONGODB_URI);
  console.log(`Server is running on port ${port}`);
});

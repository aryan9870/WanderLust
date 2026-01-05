const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirect } = require("../middelware.js");
const userCantroller = require("../cantrollers/users.js");

// Render signup form
router.get("/signup", userCantroller.renderSignupForm );

// Signup user
router.post("/signup", userCantroller.signup );

// Render login form
router.get("/login", userCantroller.renderLoginForm );

// Login user
router.post("/login", saveRedirect, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), userCantroller.login );

// Logout user
router.get("/logout", userCantroller.logout );



module.exports = router;
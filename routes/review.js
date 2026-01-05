const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, validateReview, isAuthor } = require("../middelware.js");
const reviewCantroller = require("../cantrollers/reviews.js");

// Create route 
router.post("/", isLoggedIn, validateReview, wrapAsync( reviewCantroller.createReview ));

// Delete route
router.delete("/:reviewId", isLoggedIn, isAuthor, wrapAsync( reviewCantroller.destroyReview ));

module.exports = router;
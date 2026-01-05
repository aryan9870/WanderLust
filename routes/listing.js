const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middelware.js");
const listingCantroller = require("../cantrollers/listings.js");

const multer  = require('multer')
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });




// Index
router.get("/", wrapAsync( listingCantroller.index ));

// Render new form
router.get("/new", isLoggedIn, listingCantroller.renderNewForm );

// Create listing
router.post("/", isLoggedIn, upload.single('image'), validateListing, wrapAsync( listingCantroller.createListing ));

// Show listing
router.get("/:id", wrapAsync( listingCantroller.showListing ));

// Render edit form
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync( listingCantroller.renderEditForm ));

// Update listing
router.put("/:id", isLoggedIn, isOwner, upload.single('image'), validateListing, wrapAsync( listingCantroller.updateListing ));

// Delete route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync( listingCantroller.destroyListing ));

module.exports = router;
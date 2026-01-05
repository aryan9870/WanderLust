const Listing = require("../models/listing.js");
const geocodeAddress = require("../geocode.js");


// Index 
module.exports.index = async (req, res) => {
    let { category, search } = req.query;   // query params

    let filter = {};                        // empty filter object

    // filter by category
    if (category) {
        filter.category = category;
    }

    // filter by search text
    if (search) {
        filter.$or = [
            { title: { $regex: search, $options: "i" } },       // match title
            { location: { $regex: search, $options: "i" } },    // match location
            { country: { $regex: search, $options: "i" } }      // match country
        ];
    }

    // fetch filtered listings
    const allListings = await Listing.find(filter);

    // render index page
    res.render("listings/index.ejs", { allListings });
}

// Render New Form 
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
}

// Create listing
module.exports.createListing = async (req, res) => {
    let listing = req.body;             // form data
    listing.owner = req.user._id;       // set owner

    const address = listing.location;   // get address
    console.log(address);
    const coords = await geocodeAddress(address);   // get lat/lng
    console.log(coords);
    if (!coords) {
        req.flash("error", "Location not found");
        return res.redirect("/listings/new");
    }
    if (req.file) {
        listing.image = {
            url: req.file.path,             // image url
            filename: req.file.filename,   // image name
        };
    }
    let newListing = new Listing(listing);   // create listing
    newListing.coords = {
        lat: coords.lat,
        lng: coords.lng
    };

    await newListing.save();        // save to DB
    console.log(newListing);
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
}


// Show listing
module.exports.showListing = async (req, res) => {

    let { id } = req.params;              // get listing id

    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",              // populate reviews
            populate: {
                path: "author"             // populate review author
            }
        })
        .populate("owner");               // populate listing owner

    res.render("listings/show.ejs", { listing }); // render show page
};



// Render Edit Form
module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
}

// Update Listing
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;    // listing id
    let listing = req.body;     // updated form data
    if (req.file) {
        listing.image = {
            url: req.file.path,     // new image url
            filename: req.file.filename,    // new image name
        };
    }
    await Listing.findByIdAndUpdate(id, listing);   // update in DB
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);    // redirect to listing page
}

// Delete Listing
module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!")
    res.redirect("/listings");
}

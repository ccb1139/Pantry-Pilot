let mongoose = require("mongoose"),
    express = require("express"),
    router = express.Router();

// Cookbook model
let cookbookSchema = require("../models/cookbook");

// CREATE Cookbook
router.post("/create-cookbook", (req, res, next) => {
    cookbookSchema.create(req.body)
        .then(createdDoc => {
            console.log(createdDoc);
            console.log(req.body)
            res.json(createdDoc);
        })
        .catch(error => {
            next(error);
        });
});

// READ Cookbooks
router.get("/", (req, res) => {
    cookbookSchema.find()
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            return next(error);
        });
});

// Get single cookbook
router.get("/get-cookbook/:id", async (req, res, next) => {
    try {
        const data = await cookbookSchema.findById(req.params.id);
        res.json(data);
        // console.log(data)
        console.log("Cookbook found successfully !");
    } catch (error) {
        return next(error);
    }
});

// Get single cookbook by Spoonacular ID
router.get("/get-cookbook-by-spoonID/:spoonID", async (req, res, next) => {
    try {
        const data = await cookbookSchema.findOne({ id: req.params.spoonID });
        res.json(data);
        // console.log(data);
        console.log("Cookbook found successfully !");
    } catch (error) {
        return next(error);
    }
});

// UPDATE cookbook
router.put("/update-cookbook/:id", async (req, res, next) => {
    try {
        const data = await cookbookSchema.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.json(data);
        console.log("Cookbook updated successfully !");
        // console.log(data)
    } catch (error) {
        return next(error);
    }
});


// Delete cookbook
router.delete("/delete-cookbook/:id", async (req, res, next) => {
    try {
        const data = await cookbookSchema.findByIdAndDelete(req.params.id);
        res.json(data);
        console.log("Cookbook deleted successfully !");
    } catch (error) {
        return next(error);
    }
});

module.exports = router;

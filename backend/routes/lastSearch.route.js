let mongoose = require("mongoose"),
    express = require("express"),
    router = express.Router();

// Last Search model
let lastSearchSchema = require("../models/lastSearch");

// CREATE Last Search
router.post("/create-last-search", (req, res, next) => {
    lastSearchSchema.insertMany(req.body)
        .then(createdDoc => {
            console.log(createdDoc);
            console.log(req.body)
            res.json(createdDoc);
        })
        .catch(error => {
            next(error);
        });
});

// READ Last Searches
router.get("/", (req, res) => {
    lastSearchSchema.find()
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            return next(error);
        });
});

// Get single last search
router.get("/get-last-search/:id", async (req, res, next) => {
    try {
        const data = await lastSearchSchema.findById(req.params.id);
        res.json(data);
        console.log("Last Search found successfully !");
    } catch (error) {
        return next(error);
    }
});

// UPDATE last search
router.put("/update-last-search/:id", async (req, res, next) => {
    try {
        const data = await lastSearchSchema.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.json(data);
        console.log("Last Search updated successfully !");
    } catch (error) {
        return next(error);
    }
});

// Delete last search
router.delete("/delete-last-search/:id", async (req, res, next) => {
    try {
        const data = await lastSearchSchema.findByIdAndDelete(req.params.id);
        res.json(data);
        console.log("Last Search deleted successfully !");
    } catch (error) {
        return next(error);
    }
});

router.delete("/delete-all-last-searches", async (req, res, next) => {
    try {
      const result = await lastSearchSchema.deleteMany({});
      console.log(`${result.deletedCount} documents deleted.`);
      res.json(result);
    } catch (error) {
      return next(error);
    }
  });

module.exports = router;

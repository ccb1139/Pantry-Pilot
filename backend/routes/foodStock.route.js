let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// foodStock Model
let foodStockSchema = require("../models/FoodStock");

// CREATE foodStock
router.post("/create-foodStock", (req, res, next) => {
  foodStockSchema.create(req.body)
    .then(createdDoc => {
      console.log(createdDoc);
      res.json(createdDoc);
    })
    .catch(error => {
      next(error);
    });
});

// READ foodStock
router.get("/", (req, res) => {
  foodStockSchema.find()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      return next(error);
    });
});

// Get totalStock from foodStock
router.get("/get-totalStock", (req, res) => {
  foodStockSchema.aggregate([
    {
      $group: {
        _id: null,
        totalStock: { $sum: "$stock" },
      },
    },
  ])
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      return next(error);
    });
});

// UPDATE foodStock
router.put("/update-foodStock/:id", async (req, res, next) => {
  try {
    const data = await foodStockSchema.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.json(data);
    // console.log("Food stock updated successfully !");
    // console.log(data)
  } catch (error) {
    return next(error);
  }
});


// router
//   .route("/update-foodStock/:id")
//   // Get Single Student
//   .get((req, res) => {
//     foodStockSchema.findById(
//       req.params.id, (error, data) => {
//         if (error) {
//           return next(error);
//         } else {
//           res.json(data);
//         }
//       });
//   })

//   // Update Student Data
//   .put((req, res, next) => {
//     foodStockSchema.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body,
//       },
//       (error, data) => {
//         if (error) {
//           return next(error);
//           console.log(error);
//         } else {
//           res.json(data);
//           console.log("Food stock updated successfully !");
//         }
//       }
//     );
//   });

// Delete Food Stock
router.delete("/delete-foodStock/:id", (req, res, next) => {
  foodStockSchema.findByIdAndRemove(req.params.id)
    .then((data) => {
      res.status(200).json({
        msg: data,
      });
    })
    .catch((error) => {
      return next(error);
    });
});

module.exports = router;
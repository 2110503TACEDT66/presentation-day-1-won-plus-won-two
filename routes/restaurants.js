const express = require("express");
const {
  getRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant
} = require("../controllers/restaurant");


const router = express.Router();

const { protect, authorize } = require("../middleware/auth");



router
  .route("/")
  .get(getRestaurants) 
  .post(protect, authorize("admin"), createRestaurant);
router
  .route("/:id")
  .get(getRestaurant)
  .put(protect, authorize("admin"), updateRestaurant)
  .delete(protect, authorize("admin"), deleteRestaurant);

module.exports = router;

const express = require("express");
const router = express.Router();

// CONTROLLERS
const cars_controller = require("../controllers/cars_controller");

// ROUTES CARS
router.get("/cars", cars_controller.cars_read_get); // Read all cars from DB
router.get("/cars/:id", cars_controller.car_read_get); // Read car by ID from DB
router.get("/search", cars_controller.car_find_get); // Search for car
router.post("/cars/new", cars_controller.car_create_post); // Create new car
router.put("/cars/:id/edit", cars_controller.car_update_put); // Update car by ID
router.put("/cars/edit", cars_controller.cars_update_put); // Update multiple cars
router.delete("/cars/:id", cars_controller.car_remove_delete); // Delete car by ID

module.exports = router;
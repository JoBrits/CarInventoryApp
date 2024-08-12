// CARS MODEL
const Cars = require("../models/Cars");

//function to create new car
exports.car_create_post = async (req, res) => {
  try {
    const newCar = new Cars(req.body);
    await newCar
      .save()
      .then((savedCar) => {
        console.log(savedCar);
        res.status(201).json({ msg: "Car successfully saved" });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ msg: "Unable to create new car" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Unable to save new car" });
  }
};

//function to read all cars
exports.cars_read_get = async (req, res) => {
  try {
    Cars.find()
      .then((cars) => {
        console.log(cars);
        res.status(200).json({ cars: cars });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ msg: "Unable to get cars" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Unable to get cars" });
  }
};

//function to read car by ID
exports.car_read_get = async (req, res) => {
  try {
    const id = req.params.id;
    Cars.findById(id)
      .then((cars) => {
        console.log(cars);
        res.status(200).json({ cars: cars });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ msg: "Unable to find car" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Unable to find car" });
  }
};

//function to search for a car
exports.car_find_get = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm;
    // Case insensitive, convert all to lower case
    const searchRegex = new RegExp(searchTerm, "i");
    await Cars.find({
      // match in any of the below and return
      $or: [
        { model: searchRegex },
        { make: searchRegex },
        { owner: searchRegex },
        { registrationNumber: searchRegex },
        { address: searchRegex },
        { year: searchRegex },
      ],
    })
      .then((cars) => {
        console.log(cars);
        res.status(200).json({ cars: cars });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ msg: "Unable to find cars" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No matching records found" });
  }
};

//function to update a car
exports.car_update_put = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedCar = req.body;
    await Cars.findOneAndUpdate({ _id: id }, updatedCar, { new: true })
      .then((updatedCar) => {
        console.log(updatedCar);
        res
          .status(200)
          .json({ msg: "Car successfully updated", cars: updatedCar });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ msg: "Unable to update the car" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Unable to update the cars" });
  }
};

//function to update multiple cars
exports.cars_update_put = async (req, res) => {
  try {
    const { cars } = req.body;

    console.log(cars);

    if (!Array.isArray(cars) || cars.length === 0) {
      return res.status(400).json({ msg: "No cars provided for update" });
    }

    const updatedCars = [];

    for (const updatedCar of cars) {
      const { _id, ...carDetails } = updatedCar;

      if (!_id) {
        return res.status(400).json({ msg: "Car ID is required for each car" });
      }

      const existingCar = await Cars.findById(_id);

      if (!existingCar) {
        return res.status(404).json({ msg: `Car with ID ${id} not found` });
      }

      Object.keys(carDetails).forEach((key) => {
        if (existingCar[key] !== carDetails[key]) {
          existingCar[key] = carDetails[key];
        }
      });

      const savedCar = await existingCar.save();
      updatedCars.push(savedCar);
    }

    res
      .status(200)
      .json({ msg: "Cars successfully updated", cars: updatedCars });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Unable to update the cars" });
  }
};

//function to delete a car
exports.car_remove_delete = async (req, res) => {
  try {
    const id = req.params.id;
    await Cars.findByIdAndDelete(id)
      .then((deletedCar) => {
        console.log(deletedCar);
        res
          .status(200)
          .json({ msg: "Car successfully deleted", cars: deletedCar });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ msg: "Unable to delete the car" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Unable to delete from cars" });
  }
};

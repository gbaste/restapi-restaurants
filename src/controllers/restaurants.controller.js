import Restaurant from "../models/Restaurant";
import * as utils from "../utils/utils";

export const findAllRestaurants = async (req, res) => {
  try {
    const { page, size } = req.query;
    let foodTypeFirstLetterUpperCase = "";
    if (req.query.foodtype) {
      foodTypeFirstLetterUpperCase = utils.capitalizeFirstLetter(
        req.query.foodtype
      );
    }
    const { limit, offset } = utils.getPagination(page, size);
    const data = foodTypeFirstLetterUpperCase
      ? await Restaurant.paginate(
          { food_type: foodTypeFirstLetterUpperCase },
          { offset, limit }
        )
      : await Restaurant.paginate({}, { offset, limit });
    res.json({
      totalItems: data.totalDocs,
      restaurants: data.docs,
      totalPages: data.totalPages,
      currentPage: data.page - 1,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Something went wrong" });
  }
};

export const createRestaurant = async (req, res) => {
  const { name, image_url, reviews, food_type, address, open_hours } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  } else if (!food_type) {
    return res.status(400).json({ message: "Food type is required" });
  } else if (!address) {
    return res.status(400).json({ message: "Address is required" });
  }
  try {
    const newRestaurant = new Restaurant({
      name,
      image_url,
      reviews,
      food_type,
      address,
      open_hours,
    });
    const restaurantSaved = await newRestaurant.save();
    res.json(restaurantSaved);
  } catch (error) {
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};

export const findeOneRestaurant = async (req, res) => {
  const { id } = req.params;
  try {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({
        message: `The restaurant with this ID ${id} not exists`,
      });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({
      message: error.message || `Error retrieving restaurant with ID ${id}`,
    });
  }
};

export const deleteRestaurant = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(id);
    if (!deletedRestaurant) {
      res.status(404).json({
        message:
          error.message || `The restaurant with this ID ${id} not exists`,
      });
    }
    res.json({
      message: `Restaurant ${deletedRestaurant.name} deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || `The restaurant with this ID ${id} not exists`,
    });
  }
};

export const updateRestaurant = async (req, res) => {
  const { id } = req.params;
  try {
    console.log("jnkjn");
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedRestaurant);
  } catch (error) {
    res.status(500).json({
      message:
        error.message ||
        `The restaurant with this ID ${req.params.id} not exists`,
    });
  }
};

import { Router } from "express";
import * as restController from "../controllers/restaurants.controller";
import { checkIfValidKey } from "../middlewares/middleware";

const router = Router();

router.post("/", restController.createRestaurant);

router.get("/restaurants/:id", restController.findeOneRestaurant);

router.get("/restaurants/:foodtype?", restController.findAllRestaurants);

router.delete(
  "/restaurants/:id",
  checkIfValidKey,
  restController.deleteRestaurant
);

router.put("/restaurants/:id", restController.updateRestaurant);

export default router;

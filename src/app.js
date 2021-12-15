import express from "express";
import morgan from "morgan";
import cors from "cors";
import RestaurantsRoutes from "./routes/restaurants.routes";
import AuthRoutes from "./routes/auth.routes";

const app = express();

// settings
app.set("port", process.env.PORT || 3000);

// Middlwares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/v1", RestaurantsRoutes, AuthRoutes);

app.use("/", (error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

export default app;

import { Router } from "express";
import * as authController from "../controllers/auth.controller";

const router = Router();

router.get("/generator", authController.generateKey);

export default router;

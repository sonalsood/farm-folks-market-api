import express from "express";
const router = express.Router();
import * as vendorController from "../controllers/vendor-controller.js";

router.route("/").get(vendorController.getVendors);

export default router;

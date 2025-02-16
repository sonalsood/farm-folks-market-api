import express from "express";
const router = express.Router();
import * as vendorController from "../controllers/vendor-controller.js";

router.route("/").get(vendorController.getVendors);
router
  .route("/:id")
  .get(vendorController.findVendor)
  .delete(vendorController.deleteVendor);

export default router;

import express from "express";
const router = express.Router();
import * as vendorController from "../controllers/vendor-controller.js";

router.route("/categories").get(vendorController.getUniqueCategories);
router
  .route("/")
  .get(vendorController.getVendors)
  .post(vendorController.addVendor);
router
  .route("/:id")
  .get(vendorController.findVendor)
  .delete(vendorController.deleteVendor);

export default router;

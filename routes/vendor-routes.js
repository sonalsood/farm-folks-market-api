import express from "express";
import * as vendorController from "../controllers/vendor-controller.js";
import { upload } from "../multer-config.js";

const router = express.Router();

router.route("/categories").get(vendorController.getUniqueCategories);
router
  .route("/")
  .get(vendorController.getVendors)
  .post(upload, vendorController.addVendor);
router
  .route("/:id")
  .get(vendorController.findVendor)
  .put(upload, vendorController.editVendor)
  .delete(vendorController.deleteVendor);

export default router;

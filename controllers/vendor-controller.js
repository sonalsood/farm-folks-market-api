import initKnex from "knex";
import configuration from "../knexfile.js";
import { PORT } from "../index.js";
const knex = initKnex(configuration);

const getVendors = async (_req, res) => {
  try {
    const vendors = await knex("vendors").select(
      "id",
      "name",
      "category",
      "description",
      "website",
      "imageUrl"
    );
    res.status(200).json(vendors);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error getting vendors");
  }
};

const findVendor = async (req, res) => {
  try {
    const vendorFound = await knex("vendors")
      .select(
        "id",
        "name",
        "category",
        "description",
        "contactEmail",
        "contactPhone",
        "website",
        "imageUrl",
        "updates",
        "location",
        "availability"
      )
      .where({
        id: req.params.id,
      })
      .first();

    if (vendorFound.length === 0) {
      return res.status(404).json({
        message: `Vendor with ID ${req.params.id} not found`,
      });
    }

    res.status(200).json(vendorFound);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve vendor data for vendor with ID ${req.params.id}`,
    });
  }
};

const deleteVendor = async (req, res) => {
  const vendorId = req.params.id;
  try {
    const rowsDeletedVendor = await knex("vendors")
      .where("id", vendorId)
      .delete();

    if (rowsDeletedVendor === 0) {
      return res.status(404).json({
        message: `Vendor with ID ${vendorId} not found`,
      });
    }
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).send();
  }
};

const addVendor = async (req, res) => {
  const {
    name,
    category,
    description,
    contactEmail,
    contactPhone,
    website,
    updates,
    location,
    availability,
  } = req.body;

  // Check if file is uploaded
  let imageUrl = "";
  if (req.file) {
    imageUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`; // URL to the uploaded file
  }

  // Validate required fields
  if (!name || !category || !description || !contactEmail || !contactPhone) {
    return res
      .status(400)
      .json("Error adding vendor because of missing properties");
  }

  // Validate contactEmail format
  if (!/\S+@\S+\.\S+/.test(contactEmail)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  // Validate contactPhone format (simple phone number validation)
  if (!/^\+?[0-9\s\-\(\)]{10,}$/.test(contactPhone)) {
    return res.status(400).json({ error: "Invalid phone number" });
  }

  try {
    // Insert the new vendor into the database
    const newVendorId = await knex("vendors").insert({
      name,
      category,
      description,
      contactEmail,
      contactPhone,
      website,
      imageUrl,
      updates,
      location,
      availability,
    });

    // Get the newly added vendor and return the response
    const newVendor = await knex("vendors")
      .select(
        "id",
        "name",
        "category",
        "description",
        "contactEmail",
        "contactPhone",
        "website",
        "imageUrl",
        "updates",
        "location",
        "availability",
        "created_at",
        "updated_at"
      )
      .where({ id: newVendorId[0] })
      .first();

    res.status(201).json(newVendor);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: `Error adding vendor. ${error}` });
  }
};

const getUniqueCategories = async (_req, res) => {
  try {
    // Query to select distinct categories from the 'vendors' table
    const categories = await knex("vendors")
      .distinct("category") // This will return only unique categories
      .select("category");

    const categoryNames = categories.map((category) => category.category);

    // Return the unique categories
    res.status(200).json(categoryNames);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error getting unique categories");
  }
};

const editVendor = async (req, res) => {
  const vendorId = req.params.id;
  const {
    name,
    category,
    description,
    contactEmail,
    contactPhone,
    website,
    updates,
    location,
    availability,
  } = req.body;

  try {
    // Check if the vendor exists
    const vendorExists = await knex("vendors").where({ id: vendorId }).first();
    if (!vendorExists) {
      return res
        .status(404)
        .json({ message: `Vendor with ID ${vendorId} not found` });
    }

    // Validate required fields
    if (!name || !category || !description || !contactEmail || !contactPhone) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Validate email format
    if (!/\S+@\S+\.\S+/.test(contactEmail)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Validate phone number format
    if (!/^\+?[0-9\s\-\(\)]{10,}$/.test(contactPhone)) {
      return res.status(400).json({ error: "Invalid phone number format" });
    }

    // Handle image upload
    let imageUrl = vendorExists.imageUrl; // Keep existing image if no new file is uploaded
    if (req.file) {
      imageUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
    }

    // Prepare updated data
    const updatedData = {
      name,
      category,
      description,
      contactEmail,
      contactPhone,
      website,
      imageUrl,
      updates,
      location,
      availability,
    };

    // Remove undefined fields to avoid overwriting them with null
    Object.keys(updatedData).forEach((key) => {
      if (updatedData[key] === undefined) delete updatedData[key];
    });

    // Update vendor data in the database
    await knex("vendors").where({ id: vendorId }).update(updatedData);

    // Retrieve updated vendor
    const updatedVendor = await knex("vendors")
      .select(
        "id",
        "name",
        "category",
        "description",
        "contactEmail",
        "contactPhone",
        "website",
        "imageUrl",
        "updates",
        "location",
        "availability",
        "updated_at"
      )
      .where({ id: vendorId })
      .first();

    res.status(200).json(updatedVendor);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: `Error updating vendor. ${error.message}` });
  }
};

export {
  getVendors,
  findVendor,
  deleteVendor,
  getUniqueCategories,
  addVendor,
  editVendor,
};

import initKnex from "knex";
import configuration from "../knexfile.js";
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

export { getVendors, findVendor, deleteVendor };

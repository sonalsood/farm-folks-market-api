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
      "contactInfo",
      "website",
      "imageUrl",
      "updates",
      "location",
      "availability"
    );
    res.status(200).json(vendors);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error getting vendors");
  }
};

export { getVendors };

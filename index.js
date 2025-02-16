import "dotenv/config";
import vendorRoute from "./routes/vendor-routes.js";
import cors from "cors";
import express from "express";

export const PORT = process.env.PORT || 5050;

const app = express();
//app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Route to serve the static files (uploaded images)
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Welcome to Farm Folks Market API");
});

app.get("/api", (req, res) => {
  res.send("Welcome to Farm Folks Market API");
});

app.use("/api/vendors", vendorRoute);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});

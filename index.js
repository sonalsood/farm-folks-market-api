import "dotenv/config";
import vendorRoute from "./routes/vendor-routes.js";
import cors from "cors";
import express from "express";
const app = express();
app.use(cors());

const PORT = process.env.PORT || 5050;

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

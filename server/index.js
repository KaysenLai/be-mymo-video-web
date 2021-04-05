import express from "express";
import dotenv from "dotenv";
import config from "./config/app.js";

dotenv.config();
const app = express();

app.use(express.json());
const router = express.Router();

router.route("/").get(async (req, res) => {
  res.send("hello");
});

app.use("/", router);

app.listen(config.PORT, () => {
  console.log(
    `################################################
      Server running in ${process.env.NODE_ENV} mode on port: ${config.PORT}
      ################################################`
  );
});

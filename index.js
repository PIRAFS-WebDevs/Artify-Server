const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cors = require("cors");
const connectDatabase = require("./config/database");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const routes = require("./routes/index");

dotenv.config({ path: "./config.env" });
const port = process.env.PORT || 8080;

connectDatabase();

const corsOptions = {
  origin: ["http://localhost:3000", process.env.CLIENT_URL],
  credentials: true,
};

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", corsOptions.origin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use("/api/v1/auth", routes);

app.get("/", (req, res) => {
  res.send("Artify server is running");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

const express = require("express");
const mongoose = require("mongoose");
const { config } = require("dotenv");
const cors = require("cors");
const Test = require("./models/Test");
const connect_Db = require("./db_config/db");
const boardRoutes = require("./routes/boardRoutes");
const storyRoutes = require("./routes/storyRoutes");
const userRoutes = require("./routes/userRoutes");


config();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.use("/api/board", boardRoutes);
app.use("/api/story", storyRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("agile poker service started");
});


(async () => {
  try {
    await connect_Db();
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
})();


// mongoose.connect(process.env.MONGO_URL).then(() => {

// });

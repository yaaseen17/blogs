require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productsRouter = require("./routes/products.routes");
const usersRouter = require("./routes/users.routes")
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());
app.use("/products", productsRouter);
app.use("/users", usersRouter)
app.listen(process.env.PORT || 5000, () => console.log(" Server started"));

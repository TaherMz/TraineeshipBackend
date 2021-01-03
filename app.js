require("dotenv").config();
const x= require("./helpers/initMongodb");
const express = require("express");
const app = express();
const morgan = require("morgan");
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const offerRouter = require("./routes/offerRoutes");
const PostInOffer= require("./routes/posterRoutes");

const fileupload = require('express-fileupload')



const {  verifyAccessToken } = require("./middleware/authmiddleware");

// Middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.static(`uploads`));
app.use(express.json());
app.use(fileupload())




app.use("/api/v1/auth",authRouter);
app.use("/api/v1/users",userRouter);
app.use("/api/v1/offers",offerRouter);
app.use("/api/v1/PostInOffer",PostInOffer);


app.use("/", (req, res, next) => {
  console.log("Introuvable !");
  res.status(404).json({
    status: 404,
    message: "Page not found!",
  });
});


 



// Running the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
});



require("dotenv").config();
const x = require("./helpers/initMongodb");
const express = require("express");
const app = express();
const morgan = require("morgan");
const userRouter = require("./routes/userRoutes");

// Middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.static(`${__dirname}/public`));
app.use(express.json());

const check= async (req,res,next)=>{
  const  connected=true;
  if(connected){
    next()
  }
  else
      res.end("not authorized");
}


app.use("/users",check, userRouter);

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

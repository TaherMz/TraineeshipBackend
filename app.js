require("dotenv").config();
const x= require("./helpers/initMongodb");
const express = require("express");
const app = express();
const morgan = require("morgan");
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const offerRouter = require("./routes/offerRoutes");
const PostInOffer= require("./routes/posterRoutes");

const fileupload = require('express-fileupload');
const rateLimit = require('express-rate-limit');

////////SECURE
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
 
//  apply to all requests
app.use(limiter);




// Middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.static(`uploads`));
app.use(express.json());
app.use(fileupload())


const port = 3200;






// Send Notification API
app.post('/send-notification', (req, res) => {
    const notify = {data: req.body};
    socket.emit('notification', notify); // Updates Live Notification
    res.send(notify);
});

const server = app.listen(port, () => {
  console.log(`Server connection on  local:${port}`);  // Server Connnected
});
// Socket Layer over Http Server
const socket = require('socket.io')(server);
// On every Client Connection
socket.on('connection', socket => {
    console.log('Socket: client connected');
});












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



import { configDotenv } from "dotenv";
import express from "express";
import errorHandler from "./middlewares/ErrorHandler.js";
import { userRoute } from "./routes/UserRoute.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import JWTHelper from "./helpers/JWTHelper.js";
import { dbConnect } from "./config/dbConnect.js";
configDotenv({
  path: "./config/config.env",
});

const app = express();

app.use(errorHandler);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnect(); 

app.use(cookieParser);
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      secure: false,
      httpOnly: true,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "UPDATE"],
    credentials: true,
  })
);

const PORT = 8080 || process.env.PORT;

app.route("/api/user", userRoute);

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});

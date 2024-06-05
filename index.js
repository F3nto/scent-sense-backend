const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./database/db");

//!Routers

const DealProdRoute = require("./Routes/Deal");
const PromoSeasonRoute = require("./Routes/Promo");
const BestSellerRoute = require("./Routes/BestSeller");
const newArrivalRoute = require("./Routes/NewArrival");
const topRatedRoute = require("./Routes/TopRated");
const BlogRoute = require("./Routes/Blog");
const AllProdRoute = require("./Routes/AllProd");
const TreasureProdRoute = require("./Routes/TreasureProd");
const { sendOTPRouter, verifyOTPRouter, getUserDataRouter } = require("./Routes/Auth/SignUp");
const SignInRoute = require("./Routes/Auth/Signin");
const CheckoutRoute = require("./Routes/Checkout")
const OrderListRoute = require("./Routes/OrderList")

//! Admin

const AdminSignUpRoute = require("./Routes/Auth/AdminSignUp");
const AdminLoginRoute = require("./Routes/Auth/AdminLogin");


dotenv.config();

const app = express();

//! Middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(`${req.url} : ${req.method}`);
  next();
});

app.use(`/api/v1/deal`, DealProdRoute);
app.use(`/api/v1/promo`, PromoSeasonRoute);
app.use(`/api/v1/bestseller`, BestSellerRoute);
app.use(`/api/v1/new-arrival`, newArrivalRoute);
app.use(`/api/v1/top-rated`, topRatedRoute);
app.use(`/api/v1/blog`, BlogRoute);
app.use(`/api/v1/all-products`, AllProdRoute);
app.use(`/api/v1/treasure-products`, TreasureProdRoute);

app.use(`/api/v1/send-otp`, sendOTPRouter);
app.use(`/api/v1/verify-otp`, verifyOTPRouter);
app.use(`/api/v1/users`, getUserDataRouter);

app.use(`/api/v1/sign-in`, SignInRoute);
app.use("/api/checkout", CheckoutRoute);
app.use(`/`, OrderListRoute);

app.use(`/admin-signup`, AdminSignUpRoute);
app.use(`/admin-login`, AdminLoginRoute);


app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});

db.on("error...", console.error.bind(console, "Database connection error!"));

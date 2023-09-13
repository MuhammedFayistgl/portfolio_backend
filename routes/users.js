import express from "express";
import { Login, Signup } from "../Controllers/AuthController.js";
import { getalluserData } from "../Controllers/UserController.js";
import { userVerification } from "../Middlewares/AuthMiddleware.js";

const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
	res.send("respond with a resource");
});
/**
 * ? Signup route
 */
router.post("/signup", Signup);
router.post("/login", Login);
router.post("/getuser-data-with-id", userVerification, getalluserData);

export default router;

// http://localhost:5000/v1/users/signup

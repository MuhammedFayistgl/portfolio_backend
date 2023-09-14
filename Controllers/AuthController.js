import UserModel from "../Models/UserModel.js";
import { createSecretToken } from "../utils/SecretToken.js";
import bcrypt from "bcryptjs";

/* Singup router */
export const Signup = async (req, res, next) => {
	try {
		const { email, password, username, createdAt } = req.body;
		const existingUser = await UserModel.findOne({ email });
		if (existingUser) {
			return res.json({ message: "User already exists" });
		}
		const user = await UserModel.create({
			email,
			password,
			username,
			createdAt,
		});
		const token = createSecretToken(user._id);
		res.cookie("token", token, {
			withCredentials: true,
			httpOnly: false,
			path: "/",
			sameSite:'none',
			secure:false,
		});
		res.status(201).json({
			message: "User signed in successfully",
			success: true,
			user,
		});
		next();
	} catch (error) {
		console.error(error);
	}
};
/** Login router */
export const Login = async (req, res, next) => {
	console.log(req.session.id);
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.json({ message: "All fields are required" });
		}
		const user = await UserModel.findOne({ email });
		if (!user) {
			return res.json({ message: "Incorrect password or email" });
		}
		const auth = await bcrypt.compare(`${password}`, user.password);
		if (!auth) {
			return res.json({ message: "Incorrect password or email" });
		}
		const token = createSecretToken(user._id);
		res.cookie("token", token, {
			withCredentials: true,
			httpOnly: false,
			path: "/",
			SameSite:"None",
			secure:false,
			// domain:'localhost'
		});
		req.session.isAuth = true
		res.status(201).json({
			message: "User logged in successfully",
			success: true,
		});
		next();
	} catch (error) {
		console.error(error);
	}
};

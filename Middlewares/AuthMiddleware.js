import jwt from "jsonwebtoken";
import UserModel from "../Models/UserModel.js";

/**
 * AuthMiddleware
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const userVerification = async (req, res, next) => {
	const token = req.cookies.token;
	if (!token) {
		return res.json({ status: false });
	}
	jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
		if (err) {
			return res.json({ status: false });
		} else {
			const user = await UserModel.findById(data.id);
			req.userId = data.id;
			if (user) {
				next();
			} else return res.json({ status: false });
		}
	});
};

import "dotenv/config";
import Jwt from "jsonwebtoken";

export const createSecretToken = (id) => {
	return Jwt.sign({ id }, process.env.TOKEN_KEY, {
		expiresIn: 3 * 24 * 60 * 60,
	});
};

import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config({ path: "../env.d.ts" });

export const jwt_checking = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	//Get the jwt token from the head
	// const token = <string>req.headers["auth"];
	let token =
		<string>req.body.token ||
		<string>req.query.token ||
		<string>req.headers["x-access-token"] ||
		<string>req.headers["authorization"];

	if (req.headers["authorization"]) {
		token = token.replace("Bearer ", "");
	}

	let config = process.env;

	if (!token) {
		return res.status(403).send("A token is required for authentication");
	}
	try {
		const decoded = <any>jwt.verify(token, config.JWT_SECRET);
		req.user = decoded;
	} catch (err) {
		return res.status(401).send("Invalid Token");
	}

	return next();
};

export const admin_check = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const adminUser = req.user;

	if (
		adminUser.user_type == [1] ||
		adminUser.user_type == [8] ||
		adminUser.user_type == [9] ||
		adminUser.user_type == [10] ||
		adminUser.user_type == [11] ||
		adminUser.user_type == [12]
	) {
		return next();
	} else {
		res.status(403).json({
			err: "Admin resource. Access denied.",
		});
	}
};

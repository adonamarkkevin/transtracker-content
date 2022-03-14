const cors = require("cors");
import "reflect-metadata";
import express, { Request, Response, NextFunction, json } from "express";
import { createConnection } from "typeorm";
import { jwt_checking, admin_check } from "./middleware/auth";

declare module "express" {
	export interface Request {
		user: any;
	}
}

createConnection()
	.then(async () => {
		const app = express();

		process.env.TZ = "Asia/Manila";

		const corsOpts = {
			// origin: [
			// 	"http://localhost:3000",
			// 	"http://127.0.0.1:3000",
			// 	"http://localhost:2021",
			// 	"http://127.0.0.1:2021",
			// 	"http://192.168.8.128:3000",
			// 	"http://119.8.121.51:8702",
			// 	"http://159.138.24.196:8702",
			// 	"http://tms.dict.gov.ph",
			// 	"http://tms.dict.gov.ph/api",
			// 	"https://tms.dict.gov.ph",
			// 	"https://tms.dict.gov.ph/api",
			// 	"http://localhost:2222",
			// 	"http://119.13.77.183:5050",
			// ],
			origin: true,
			methods: ["GET", "POST", "DELETE", "PUT"],
			allowedHeaders: ["Content-Type", "authorization", "x-access-token"],
			credentials: true,
			exposedHeaders: ["set-cookie"],
		};
		app.use(express.json());

		app.use(cors(corsOpts));

		const { AppRoutes } = await import("./routes");

		AppRoutes.forEach((route) => {
			let jwt_except = [
				/// place all api that need to be excluded on jwtchecking
			];

			if (jwt_except.indexOf(route.path) > -1) {
				app[route.method](route.path, (req: Request, res: Response) => {
					route.action(req, res);
				});
			}

			app[route.method](
				route.path,
				// [jwt_checking],
				// [admin_check]
				(req: Request, res: Response) => {
					route.action(req, res);
				}
			);
		});

		const PORT = process.env.PORT || 9004;

		// run app
		app.listen(PORT, () => {
			console.log(`server started on localhost:${PORT}`);
		});
	})
	.catch((error) => {
		console.log("TypeORM connection error: ", error);
		process.exit(0);
	});

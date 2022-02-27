import "reflect-metadata";
import { createConnection } from "typeorm";
import cors from "cors";
const express = require("express");

declare module "express" {
	export interface Request {
		user: any;
	}
}

createConnection()
	.then(async (connection) => {
		const app = express();

		process.env.TZ = "Asia/Manila";

		const corsOpts = {
			origin: [
				"http://localhost:3000",
				"http://127.0.0.1:3000",
				"http://localhost:2021",
				"http://127.0.0.1:2021",
				"http://192.168.8.128:3000",
				"http://119.8.121.51:8702",
				"http://159.138.24.196:8702",
				"http://tms.dict.gov.ph",
				"http://tms.dict.gov.ph/api",
				"https://tms.dict.gov.ph",
				"https://tms.dict.gov.ph/api",
				"http://localhost:2222",
				"http://119.13.77.183:5050/",
				"http://localhost:2222/",
			],
			// origin: true,
			methods: ["GET", "POST", "DELETE", "PUT"],
			allowedHeaders: ["Content-Type", "authorization", "x-access-token"],
			credentials: true,
			exposedHeaders: ["set-cookie"],
		};

		app.use(cors(corsOpts));

		// run app
		app.listen(parseInt(process.env.PORT), () => {
			console.log(`server started on localhost:${process.env.PORT}`);
		});
	})
	.catch((error) => console.log(error));

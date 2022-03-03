import { updateEmail } from "../controller/email.controller";

export const emailRoutes: {
	path: string;
	method: string;
	action: any;
}[] = [
	{
		path: "/api/v1/transtracker-content/email/update-email/:emailId",
		method: "put",
		action: updateEmail,
	},
];

import { smsUpdate } from "../controller/sms.controller";

export const smsRoutes: {
	path: string;
	method: string;
	action: any;
}[] = [
	{
		path: "/api/v1/transtracker-content/sms/update-sms/:smsId",
		method: "put",
		action: smsUpdate,
	},
];

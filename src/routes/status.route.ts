import { createNotif, deleteStatus } from "../controller/status.controller";

export const statusRoutes: {
	path: string;
	method: string;
	action: any;
}[] = [
	{
		path: "/api/v1/transtracker-content/status/create-notif",
		method: "post",
		action: createNotif,
	},
	{
		path: "/api/v1/transtracker-content/status/delete-notif/:statusId",
		method: "delete",
		action: deleteStatus,
	},
];

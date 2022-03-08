import {
	createWorkgroup,
	getAllWorkgroup,
	getWorkgroup,
} from "../controller/workgroup.controller";

export const workgroupRoutes: {
	path: string;
	method: string;
	action: any;
}[] = [
	{
		path: "/api/v1/transtracker-content/workgroup/create-workgroup",
		method: "post",
		action: createWorkgroup,
	},
	{
		path: "/api/v1/transtracker-content/workgroup/get-workgroup/all",
		method: "get",
		action: getAllWorkgroup,
	},
	{
		path: "/api/v1/transtracker-content/workgroup/get-workgroup/:workgroupId",
		method: "get",
		action: getWorkgroup,
	},
];

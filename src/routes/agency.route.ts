import {
	agencyTypeCreate,
	agencyToDelete,
	getAllAgencies,
	getAgency,
} from "../controller/agency.controller";

export const agencyRoutes: {
	path: string;
	method: string;
	action: any;
}[] = [
	{
		path: "/api/v1/transtracker-content/agency/create-agency",
		method: "post",
		action: agencyTypeCreate,
	},
	{
		path: "/api/v1/transtracker-content/agency/delete-agency/:agencyId",
		method: "delete",
		action: agencyToDelete,
	},
	{
		path: "/api/v1/transtracker-content/agency/get-agency/all",
		method: "get",
		action: getAllAgencies,
	},
	{
		path: "/api/v1/transtracker-content/agency/get-agency/:agencyId",
		method: "get",
		action: getAgency,
	},
];

import { agencyRoutes } from "./routes/agency.route";
import { emailRoutes } from "./routes/email.route";
import { smsRoutes } from "./routes/sms.route";
import { statusRoutes } from "./routes/status.route";
import { workgroupRoutes } from "./routes/workgroup.route";

export const AppRoutes = [
	...agencyRoutes,
	...emailRoutes,
	...smsRoutes,
	...statusRoutes,
	...workgroupRoutes,
];

import { IOrganization } from "./organization.interface";

export interface IAdmin {
    adminName: string;
	email: string;
	password: string;
	organization: string | IOrganization;
	lastChangePassword: Date;
}
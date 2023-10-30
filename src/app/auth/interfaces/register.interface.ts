import { IAdmin } from 'src/interfaces/admin.interface';
import { IOrganization } from 'src/interfaces/organization.interface';

export interface IOrgForm {
  organization_name: string;
  company: string;
  headQuarters: string;
  industry: string;
  description: string;
  logo: object;
}

export interface IAdminForm {
  adminName: string;
  email: string;
  password: string;
  organization: string;
}

export interface IOrgResponse {
  message: string;
  organization: IOrganization;
}

export interface IAdminResponse {
  message: string;
  admin: IAdmin;
}
export interface IEmployeeResponse {
  message: string;
  token: string;
}

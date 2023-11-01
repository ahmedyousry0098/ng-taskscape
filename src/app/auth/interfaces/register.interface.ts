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
  employee: {
    createdAt: string;
    createdBy: string;
    email: string;
    employeeName: string;
    isFresh: boolean;
    lastChangePassword: string;
    organization: string;
    role: string;
    _id: string;
  };
}

export interface IEmployeeDataResponse {
  createdAt: string;
  createdBy: string;
  email: string;
  employeeName: string;
  isFresh: boolean;
  lastChangePassword: string;
  organization: string;
  role: string;
  _id: string;
}

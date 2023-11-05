export interface IProject {
  projectName: string;
  startDate: string;
  deadline: string;
  description: string;
  scrumMaster?: string;
  employees: IEmployee[];
  organization?: string;
  _id: string;
  sprints: [];
}
export interface IEmployee {
  employeeName: string;
  email: string;
  password: string;
  role: IRole;
  lastChangePassword: Date;
  createdBy: string;
  organization: string;
  _id: string;
  title: string;
}

export enum IRole {
  scrumMaster = 'scrumMaster',
  member = 'member',
}

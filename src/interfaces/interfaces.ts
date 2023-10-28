export interface IProject {
  projectName: string;
  startDate: string;
  deadline: string;
  description: string;
  scrumMaster: string;
  employee: IEmployee[];
  organization: string;
}
export interface IEmployee {
  employeeName: string;
  email: string;
  password: string;
  role: 'scrumMaster' | 'member';
  lastChangePassword: Date;
  createdBy: string;
  organization: string;
  _id: string;
}

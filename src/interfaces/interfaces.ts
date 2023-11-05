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
  profile_photo: {
    secure_url: string | null;
    public_id: string | null;
  };
}

export enum IRole {
  scrumMaster = 'scrumMaster',
  member = 'member',
}

export interface ISprint {
  sprint_name: string;
  start_date: string;
  deadline: string;
  _id: string;
}

export interface IProjectWithSprint extends IProject {
  sprints: ISprint[];
}

export interface ITask {
  taskName: string;
  description: string;
  startDate: string;
  deadline: string;
  status: IStatus;
  project: string;
  sprintId: string;
  assignTo: IEmployee;
}
export enum IStatus {
  TODO = 'todo',
  DOING = 'doing',
  DONE = 'done',
}

export interface ITaskWithEmployee extends ITask {
  assignToEmployee: IEmployee;
}

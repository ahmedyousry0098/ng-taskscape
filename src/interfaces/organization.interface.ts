import { IImage } from "./image.interface";

export interface IOrganization {
    _id: string
    organization_name: string
    company: string; // unique
    description?: string;
    industry: string // default field in db -> software development
    headQuarters: string;
    logo: IImage;
    isDeleted: boolean
    isVerified: boolean
}
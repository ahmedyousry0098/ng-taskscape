
export interface INotification {
    _id: string
    title: string;
    description: string;
    type: string
    to: string,
    isReaded: boolean;
    createdAt: Date
}
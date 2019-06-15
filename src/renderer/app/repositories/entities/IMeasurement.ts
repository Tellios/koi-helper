import { Id } from "../../storage";

export interface IMeasurement {
    Id: Id;
    Fish: Id;
    Date: string;
    Length: number;
    Weight: number;
    Comment: string;
}
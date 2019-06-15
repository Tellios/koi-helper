import { Id } from "../../storage";

export interface IFish {
  Id: Id;
  Born: string;
  Sex: string;
  Country: string;
  Value: string;
  Breeder: string;
  Pond: Id;
  Variety: Id;
  Name: string;
}

import { IMainBarAction } from "./IMainBarAction";

export interface IMainBarOptions {
  title: string;
  showBackButton: boolean;
  actions: IMainBarAction[];
}

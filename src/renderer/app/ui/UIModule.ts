import { Module } from "app/ioc";
import { setMainBar } from "./mainBar";

export interface IUIActions {
  setMainBar: typeof setMainBar;
}

@Module({
  actions: [setMainBar]
})
export class UIModule {}

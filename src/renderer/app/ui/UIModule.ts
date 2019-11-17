import { Module } from "app/ioc";
import { setMainBar } from "./mainBar";

export interface IUIActions {
  setMainBar: typeof setMainBar;
}

@Module({
  name: "ui",
  actions: [{ name: "setMainBar", action: setMainBar }]
})
export class UIModule {}
